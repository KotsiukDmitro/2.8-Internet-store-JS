import { products, shops } from './products.js'
import { renderBag, setBagData } from './bag.js'

document.addEventListener('DOMContentLoaded', function () {
    renderShops(shops)
    numberProducts()
    slider()

    const radio = document.querySelectorAll('input[name="store"]')
    radio.forEach(elem => {
        elem.addEventListener('change', function () {
            renderProducts()
        })
    })
    document.getElementById('search').addEventListener('change', function () {
        numberProducts()
        renderProducts()
    })

    document.querySelector('input[name="price"]').addEventListener('change', function () {
        slider()
        numberProducts()
        renderProducts()
    })
    renderProducts()
    renderBag()
})

function slider() {
    document.getElementById('fillRangeValue').innerHTML = document.getElementById('rangeValue').value
}

function renderProducts() {
    const store = document.querySelector('input[name="store"]:checked').value
    const filterProducts = products.filter(function (item) {
        if (item.price > document.querySelector('input[name="price"]').value) {
            return false
        }
        if (!item.name.toLowerCase().includes(document.getElementById('search').value.toLowerCase())) {
            return false
        }
        if (store !== 'all') {
            return store === item.store
        }

        return true
    })

    let product = ''
    filterProducts.forEach(elem => {
        const html = `
            <div class="item allStores" data-id="${elem.id}">
            <img class=" foto" src="${elem.image} "alt="photo">
            <p> ${elem.name}</p>
                <div class="price">$${elem.price}</div>
            </div>
        `
        product = product + html
    })
    document.getElementById('product').innerHTML = product

    const productsBtn = document.querySelectorAll('.item').forEach(element => {
        element.addEventListener('click', e => {
            confirm('добавить в корзину?')
            let id = e.currentTarget.dataset.id
            setBagData(id)
        })
    })
}


function numberProducts() {
    let result = {}
    shops.forEach(item => {
        const productsFilter = products.filter(elem => {
            return elem.store === item && elem.price <= document.querySelector('input[name="price"]').value
        })
        result[item] = productsFilter.length

    })
    for (let i in result) {
        document.getElementById(`shop${i}`).innerHTML = result[i]

        //сокращенный ниже код
        document.getElementById(i).disabled = result[i] === 0

        // if (result[i] === 0) {
        //     document.getElementById(i).disabled = true
        // } else {
        //     document.getElementById(i).disabled = false
        // }
    }
    let resultAll = {}
    const productsAllFilter = products.filter(e => {
        return e.price <= document.querySelector('input[name="price"]').value
    })
    resultAll = productsAllFilter.length
    document.getElementById('allProducts').innerHTML = resultAll
}

function renderShops(shops) {
    let shop = ''
    shops.forEach(item => {
        const htmlRadioButtons = `
    <label class="button"><input id="${item}" type="radio" name="store" value="${item}"
    class="filter"> ${item} (<span id="shop${item}"></span>)</label>             
    `
        shop = shop + htmlRadioButtons
    })
    document.getElementById('shop').innerHTML += shop

}
