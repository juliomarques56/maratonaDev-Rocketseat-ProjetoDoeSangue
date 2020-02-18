//Configurando o servidor
const express = require("express")
const server = express()

//Configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

// Habilitar body do formulario
server.use(express.urlencoded({extended: true}))

// Configurar a conexão com banco de dados
const Poll = require('pg').Pool
const db = new Poll({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'doe',
})

// Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


// Configurar a apresentação
server.get("/", function(req, res){
    db.query("SELECT * FROM donors", function(err, result){
        if (err) return res.send("Erro de bando de dados.")

        const donors = result.rows
        return res.render("index.html", {donors})
    })

    
})

server.post("/", function(req, res){
    //Pega dados do formulario
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios.")
    }

    // Coloco valores dentro do banco de dados
    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err){
        //Fluxo de erro
        if (err) return res.send("Erro no banco de dados.")
        // Fluxo ideal
        return res.redirect("/")
    })

})
// Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Iniciei o servidor")
})