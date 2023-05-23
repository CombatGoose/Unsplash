const productsEl = document.querySelector('.products')
let products = JSON.parse(localStorage.getItem('favourite'))

const removeFromFavourites = (id) => {
  products = products.filter(product => product.id !== id)
  localStorage.setItem('favourite', JSON.stringify(products))
  renderFavourites()
}

const renderFavourites = () => {
  productsEl.innerHTML = ''

  products.forEach(product => {
    if (product.largeImageURL !== undefined) {
      productsEl.innerHTML += `
        <div class="photo-card" card-id="${product.id}">
          <button class="fav" btn-id="btn-${product.id}" onclick="removeFromFavourites(${product.id})">Delete from favourite</button>
          <img src="${product.largeImageURL}" class="img" alt="${product.tags}">
        </div>
      `
    }
  })
}

renderFavourites()