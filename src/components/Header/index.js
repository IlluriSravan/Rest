import './index.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../context/CartContext'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    console.log(props)
    Cookies.remove('jwt_token')
    // history.replace('/login')
  }

  const renderCartCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )
  return (
    <>
      <div className="header">
        <div className="left">
          <Link className="heading" to="/">
            <h1 className="heading">UNI Resto Cafe</h1>
          </Link>
        </div>
        <div className="right">
          <Link to="/cart">
            <button type="button" className="add-cart-button">
              <IoCartOutline />
            </button>
          </Link>

          {renderCartCount()}
        </div>
        <div className="right2">
          <button type="button" onClick={onLogout} className="logout-button">
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}
export default Header
