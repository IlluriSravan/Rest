import './App.css'
import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CartContext from './context/CartContext'
import Body from './components/Body'
import Cart from './components/Cart'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {cartList: []}

  addCartItem = product => {
    const {cartList} = this.state
    const found = cartList.find(each => each.dishId === product.dishId)
    if (!found) {
      this.setState(prev => ({
        cartList: [...prev.cartList, product],
      }))
    }
  }

  removeCartItem = (id, price) => {
    const {cartList} = this.state
    const updated = cartList.filter(each => each.dishId !== id)
    this.setState({cartList: updated})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state
    const updated = cartList.map(each => {
      const price = each.dishPrice
      if (each.dishId === id) {
        return {
          ...each,
          quantity: each.quantity + 1,
          dishPrice: price * quantity,
        }
      }
      return each
    })
    this.setState({cartList: updated})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updated = cartList.map(each => {
      if (each.dishId === id) {
        return {
          ...each,
          quantity: each.quantity === 0 ? 0 : each.quantity - 1,
          dishPrice: each.dishPrice * each.quantity,
        }
      }
      return each
    })
    this.setState({cartList: updated})
  }

  render() {
    const {cartList} = this.state
    console.log('cart', cartList)
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Body} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App

//
//
//
