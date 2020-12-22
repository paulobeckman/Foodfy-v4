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



const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target
        
        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event){    
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode //<div class="photo">
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"')
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    }
}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e){
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.button = 0
        Lightbox.closeButton.style.top = 0
    },

    close() {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.button = "initial"
        Lightbox.closeButton.style.top = "-80px"
    }
}