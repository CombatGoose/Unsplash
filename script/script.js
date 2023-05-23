let productsStore = [

]

//gallery
const gallery = document.querySelector('.gallery')

//Button add more
const more = document.querySelector(".more")

//fav
const toFav = document.querySelector("#toFav")

//Save components from header
const headerInput = document.querySelector("#header-input")
const headerButton = document.querySelector("#header-button")

//Save components from main
const mainInput = document.querySelector("#main-input")
const mainInputButton = document.querySelector("#main-button")

//Save API and URL
const APIKey = "36456907-f9dba33cb8484d6b9084cc6b6"
const url = "https://pixabay.com/api/"

if (!localStorage.getItem('favourite')) {
    localStorage.setItem('favourite', JSON.stringify([]))
}

const renderImgCards = (imgStore) => {
    imgStore.forEach(imgCard => {
        gallery.innerHTML += `
        <div class="photo-card" card-id="${imgCard.id}">
        <button class="fav" btn-id="${imgCard.id}">Add to favourite</button>
        <img src="${imgCard.largeImageURL}" class="img" alt="${imgCard.tags}">
        <ul class="photo-list">
            <li class="photo-list-item">
                <p class="photo-param">views</p>
                <p class="photo-text">${imgCard.views}</p>
            </li>
            <li class="photo-list-item">
                <p class="photo-param">downloads</p>
                <p class="photo-text">${imgCard.downloads}</p>
            </li>
            <li class="photo-list-item">
                <p class="photo-param">likes</p>
                <p class="photo-text">${imgCard.likes}</p>
            </li>
            <li class="photo-list-item">
                <p class="photo-param">comments</p>
                <p class="photo-text">${imgCard.comments}</p>
            </li>
        </ul>
    </div>
        `
        const fav = document.querySelector(".fav")
        localStorage.setItem("fav", fav)
    })

    const searchText = headerInput.value
    let fullUrl = `${url}/?key=${APIKey}&orientation=horizontal&per_page=20`

    const addBtns = document.querySelectorAll(".fav")

    addBtns.forEach(btn => {
        btn.addEventListener('click',() => {
            const currentId = parseInt(btn.getAttribute('btn-id'))

                let currentProduct = productsStore.filter(product => {
                    if(product.id == currentId){
                        return product
                    }
                })

            let productsFavourite = JSON.parse(localStorage.getItem('favourite'))
            productsFavourite = [ 
                ...productsFavourite,
                {
                    ...currentProduct[0]
                }
            ]
            localStorage.setItem('favourite', JSON.stringify(productsFavourite))
            console.log(localStorage.getItem("favourite"))
            btn.style.display = 'none'
        })
    })

}

toFav.addEventListener('click', () => {
    window.location.href = "./favourite.html"
})

//Main function to take information about user's search
const takeInfo = () => {
    //Save value of input in const
    const searchText = headerInput.value

    //If user has entered something do next code
    if(searchText.length > 0) {
        //Save page and value of input to add more cartoons when user clicks on the button
        localStorage.setItem('search', searchText)
        localStorage.setItem('page', 1)

        let fullUrl = `${url}/?key=${APIKey}&orientation=horizontal&per_page=20`

        fetch(`${fullUrl}&page=1&q=${searchText}`)
            .then((response) => response.json())
            .then((data) => {
                productsStore = data.hits
                renderImgCards(data.hits)

  })
    } else {
        alert("Please, enter something")
    }

    //Make "Add more" visible
    more.style.display = "block"

    //Make input empty
    headerInput.value = ""
}

headerButton.addEventListener("click", takeInfo)
headerButton.addEventListener("click", () => {
    gallery.innerHTML = ""
})

//Add more cartoons
const moreCard = () => {
    let searchText = localStorage.getItem('search')
    let page = parseInt(localStorage.getItem('page'))

    page += 1
    localStorage.setItem('page', page)

    let fullUrl = `${url}/?key=${APIKey}&orientation=horizontal&per_page=20`

    fetch(`${fullUrl}&page=${page}&q=${searchText}`)
        .then((response) => response.json())
        .then((data) => {
            renderImgCards(data.hits);
        })
}