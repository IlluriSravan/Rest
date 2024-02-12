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
            <p>Nothing to show here</p>
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
