import { products } from './products.js'

document.addEventListener('DOMContentLoaded', function () {

    function html(current) {
        return `
            <div class="item">
            <img class="foto" src="${current.image}" "alt="photo">
            <p>${current.name}</p>
                <div class="price">$${current.price}</div>
            </div>
        `
    }

    const productsHome = products.slice(0, 3).reduce((prev, current) => {
        const currProduct = html(current)
        return prev + currProduct
    }, '')
    document.querySelector('.products').innerHTML = productsHome


})
