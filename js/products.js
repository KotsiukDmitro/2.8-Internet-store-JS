export const products = [
    { name: 'High-Back Bench', store: 'ikea', image: 'photo/img-1.jpg', price: 20.95, id: 1 },
    { name: 'Albony Table', store: 'marcos', image: 'photo/img-2.jpg', price: 80.95, id: 2 },
    { name: 'Accent Cheir', store: 'caressa', image: 'photo/img-3.jpg', price: 50.95, id: 3 },
    { name: 'Wooden Table', store: 'liddy', image: 'photo/img-4.jpg', price: 30.65, id: 4 },
    { name: 'Dining Table', store: 'ikea', image: 'photo/img-5.jpg', price: 20.00, id: 5 },
    { name: 'Sofa Set', store: 'marcos', image: 'photo/img-6.jpg', price: 78.95, id: 6 },
    { name: 'Modern Bookshelf', store: 'caressa', image: 'photo/img-7.jpg', price: 7.95, id: 7 },
    { name: 'Emperor Bad', store: 'liddy', image: 'photo/img-8.jpg', price: 8.75, id: 8 },
    { name: 'Utopia sofa', store: 'ikea', image: 'photo/img-5.jpg', price: 35.05, id: 9 },
    { name: 'Sofa', store: 'marcos', image: 'photo/img-10.jpg', price: 14.55, id: 10 },
    { name: 'Sectional', store: 'caressa', image: 'photo/img-11.jpg', price: 30.50, id: 11 },
    { name: 'Centre', store: 'liddy', image: 'photo/img-12.jpg', price: 50.25, id: 12 }
]
const shopsList = []
products.forEach(item => {
    if (!shopsList.includes(item.store)) {
        shopsList.push(item.store)
    }
})
export const shops = shopsList
