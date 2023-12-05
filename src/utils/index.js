// export const totalPrice2 = (items) => {
//     return items.reduce((acc, item) => {
//         return acc + item.price * item.quantity
//     }, 0)
// }

// Quien es product? 
// This function calculates total price of a new order
// products = [{price: 10}, {price: 20}]
// cartProduct: Array de objetos
//retorna  un numero
export const totalPrice = (products) => {
   let sum = 0
   products.forEach(product => 
         sum += product.price)
         return sum
   }
