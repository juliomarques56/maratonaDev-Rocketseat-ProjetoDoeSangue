var img = false
document
    .querySelector('header button')
    .addEventListener("click", function(){
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })

document
    
    .querySelector('footer button')
    .addEventListener("click", function(){
        document
            .querySelector('body')
            .classList.toggle('theme-dark')
         
        document
            .querySelector('h2')
            .classList.toggle('h2')

        document
            .querySelector('main h2')
            .classList.toggle('h2')
        
    })

function trocar() {
    if (img == false){
        img = true
        document.getElementById('img').src = "logo-white.png"
    }
    else{
        img = false
        document.getElementById('img').src = "logo-doe.png"
    }
}

    