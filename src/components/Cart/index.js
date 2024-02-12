import CartList from '../CartList'
import CartContext from '../../context/CartContext'
import CartHeader from '../CartHeader'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <>
          <CartHeader />
          {cartList.length === 0 ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              className="cart-empty-image"
              alt="cart empty"
            />
          ) : (
            <ul className="cart-list">
              {cartList.map(eachCartItem => (
                <CartList
                  key={eachCartItem.dishId}
                  cartItemDetails={eachCartItem}
                />
              ))}
            </ul>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
// (
// const {
//   cartList,
//   incrementCartItemQuantity,
//   decrementCartItemQuantity,
// } = value
//               )
