import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'


export const addToCart = (id ) => async( dispatch ,getState)=>{

const {data} = await axios.get(`/api/products/${id}`)

dispatch({
type: CART_ADD_ITEM , payload : {
seller:data.seller,
sellerName:data.sellerName,
product: data._id,
name: data.name,
image: data.image,
price:data.prix,
qty: data.quantity

}

})

localStorage.setItem('cartItems' ,JSON.stringify(getState().cart.cartItems) )
}

export const removeFromCart = (id) => (dispatch , getState)=>{

dispatch({type: CART_REMOVE_ITEM , payload: id})

localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}