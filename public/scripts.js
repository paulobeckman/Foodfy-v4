const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function(){
        const Id = card.getAttribute("id")
        window.location.href = `recipes/${Id}`
    })
}


const showHides = document.querySelectorAll('h4')

for (let showHide of showHides){

    // let selector = document.querySelector('.topic-content').classList.toggle('hide')

    showHide.addEventListener("click", function(){        

        if(showHide.getAttribute("id") ===  "1" && showHide.innerHTML === "MOSTRAR"){
            document.querySelector('.topic_content_ingredients').classList.toggle('hide')

            document.getElementById("1").innerHTML = "ESCONDER"

        } else if (showHide.getAttribute("id") ===  "1"  && showHide.innerHTML === "ESCONDER"){
            document.querySelector('.topic_content_ingredients').classList.toggle('hide')

            document.getElementById("1").innerHTML = "MOSTRAR"

        } else if(showHide.getAttribute("id") ===  "2" && showHide.innerHTML === "MOSTRAR"){
            document.querySelector('.topic_content_preparation').classList.toggle('hide')

            document.getElementById("2").innerHTML = "ESCONDER"
            
        } else if (showHide.getAttribute("id") ===  "2" && showHide.innerHTML === "ESCONDER"){
            document.querySelector('.topic_content_preparation').classList.toggle('hide')

            document.getElementById("2").innerHTML = "MOSTRAR"

        } else if(showHide.getAttribute("id") ===  "3" && showHide.innerHTML === "MOSTRAR"){
            document.querySelector('.topic_content_information').classList.toggle('hide')

            document.getElementById("3").innerHTML = "ESCONDER"
            
        } else if (showHide.getAttribute("id") ===  "3" && showHide.innerHTML === "ESCONDER"){
            document.querySelector('.topic_content_information').classList.toggle('hide')

            document.getElementById("3").innerHTML = "MOSTRAR"
        }
    })
}

function addIngredient(){
    const ingredients = document.querySelector("#ingredients_create");
    const fieldContainer = document.querySelectorAll (".ingredient");

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length -1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient)



function addPreparetion(){
    const preparetion = document.querySelector("#preparations_mode")
    const fieldContainer = document.querySelectorAll(".preparation_mode")

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length -1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    preparetion.appendChild(newField);
}

document
    .querySelector(".add-preparations_mode")
    .addEventListener("click", addPreparetion)








