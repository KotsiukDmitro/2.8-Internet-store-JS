import { products } from './products.js'

document.addEventListener('DOMContentLoaded', function () {
    renderBag()
    document.getElementById('bagBtn').addEventListener('click', function (event) {
        event.preventDefault()
        document.querySelector('.bag').classList.add('active')
        document.querySelector('.backDrop').classList.add('active')

    })
    document.getElementById('close').addEventListener('click', function (event) {
        event.preventDefault()
        document.querySelector('.bag').classList.remove('active')
        document.querySelector('.backDrop').classList.remove('active')
    })

})

function productInBag(elem) {
    const idProduct = products.find(el => el.id == elem.id)
    return `
    <div class="productsInBag" data-id="${idProduct.id}">
            <div class="prod">
                <img class="foto" src="${idProduct.image}" alt="">
                <div class="productInBag">
                    <p>${idProduct.name}</p>
                    <div class="price">$${idProduct.price}</div>
                    <button class="price btnRemove" data-id="${idProduct.id}">remove</button>
                </div>
            </div>

            <div class="amountInBag" >
                <i class="fa-solid fa-chevron-up plus" data-id="${idProduct.id}"></i>
                <span class="amount">${elem.quantity}</span>
                <i class="fa-solid fa-chevron-down minus" data-id="${idProduct.id}"></i>
            </div>
        </div>
       `
}

// // Получить данные из LocalStorage
function getBagData() {

    return JSON.parse(localStorage.getItem('bag')) || []
}
//Записываем данные в LocalStorage
export function setBagData(id) {
    const bagData = getBagData()
    const itemInBag = bagData.find(elem => id === elem.id)
    if (itemInBag === undefined) {
        const bagItem = {
            id,
            quantity: 1
        }
        bagData.push(bagItem)
    }
    localStorage.setItem('bag', JSON.stringify(bagData))
    renderBag()
}

export function renderBag() {
    //1 взять все продукты из LS
    const bagData = getBagData()
    //2 сгенерировать для этих продуктов html с помощью reduce и productInBag()
    const bag = bagData.reduce((prev, current) => {
        const currProduct = productInBag(current)
        return prev + currProduct
    }, '')
    //3 сохранить innerHtml в корзине
    document.getElementById('productInBag').innerHTML = bag
    //4 обновить счетчик количества продуктов и общей суммы
    document.querySelector('.amountCart').innerHTML = bagData.length

    total()
    //5 удаление продукта из корзины
    document.querySelectorAll('.btnRemove').forEach(item => {
        item.addEventListener('click', e => {
            let deleteProduct = e.currentTarget.dataset.id
            const index = bagData.findIndex(element => {
                return element.id == deleteProduct
            })
            bagData.splice(index, 1)
            localStorage.setItem('bag', JSON.stringify(bagData))
            renderBag()
        })
    })
    // увеличение кол-ва
    document.querySelectorAll('.plus').forEach(i => {
        i.addEventListener('click', event => {
            let idAdd = event.currentTarget.dataset.id
            let quantityProduct

            const newBagData = bagData.map(el => {

                if (el.id == idAdd) {
                    quantityProduct = ++el.quantity
                }
                return el
            })
            localStorage.setItem('bag', JSON.stringify(newBagData))
            document.querySelector(`[data-id="${idAdd}"] .amount`).innerHTML = quantityProduct
            total()
        })
    })
    //уменьшение кол-ва
    document.querySelectorAll('.minus').forEach(j => {
        j.addEventListener('click', event => {
            let idRemove = event.currentTarget.dataset.id
            let quantityProduct
            const newBagData = bagData.map(element => {
                if (element.id == idRemove && element.quantity > 1) {
                    quantityProduct = --element.quantity
                }
                return element
            })
            if (quantityProduct) {
                localStorage.setItem('bag', JSON.stringify(newBagData))
                document.querySelector(`[data-id="${idRemove}"] .amount`).innerHTML = quantityProduct
                total()
            }
        })
    })
}

function total() {
    const total = getBagData().reduce((prevValue, currentValue) => {
        const current = products.find(elem => elem.id == currentValue.id)
        const totalPrice = current.price * 100 * currentValue.quantity
        return prevValue + totalPrice
    }, 0) / 100
    document.getElementById('total').innerHTML = total
}

document.getElementById('removeAll').addEventListener('click', function () {
    localStorage.setItem('bag', JSON.stringify([]))
    renderBag()
})

