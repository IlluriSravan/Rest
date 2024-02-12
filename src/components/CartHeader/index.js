import './index.css'
import {Redirect, Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const CartHeader = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onLogout = () => {
        const {history} = props
        console.log(props)
        Cookies.remove('jwt_token')
        history.replace('/login')
        return <Redirect to="/login" />
      }

      const onRemoveAll = () => {
        removeAllCartItems()
      }
      return (
        <nav className="nav-bar">
          <Link to="/">
            <h1 className="cafe-name">UNI Resto Cafe</h1>
          </Link>

          <div className="nav-items">
            <p className="my-orders">My Orders</p>
            <div className="cart">
              <Link to="/cart">
                <AiOutlineShoppingCart className="cart-icon" />
                <span className="cart-count">{cartList.length}</span>
              </Link>
            </div>
          </div>
          <button type="button" onClick={onRemoveAll} className="add-cart-item">
            Remove All
          </button>
          <button type="button" className="add-cart-item" onClick={onLogout}>
            Logout
          </button>
        </nav>
      )
    }}
  </CartContext.Consumer>
)
export default withRouter(CartHeader)
