import Cart from '../Cart'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      console.log('carrr', cartList)
      return (
        <>
          {cartList.length === 0 ? (
            <p>Nothing to show here</p>
          ) : (
            <ul className="cart-list">
              {cartList.map(eachCartItem => (
                <Cart
                  key={eachCartItem.dishId}
                  cartItemDetails={eachCartItem}
                  incrementCartItemQuantity={incrementCartItemQuantity}
                  decrementCartItemQuantity={decrementCartItemQuantity}
                />
              ))}
            </ul>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
