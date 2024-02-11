import CartList from '../CartList'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      return (
        <>
          <Header />
          {cartList.length === 0 ? (
            <p>Nothing to show here</p>
          ) : (
            <ul className="cart-list">
              {cartList.map(eachCartItem => (
                <CartList
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

export default Cart
// (
// const {
//   cartList,
//   incrementCartItemQuantity,
//   decrementCartItemQuantity,
// } = value
//               )
