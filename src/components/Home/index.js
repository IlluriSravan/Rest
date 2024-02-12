import {useState} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import MenuItem from '../MenuItem'
import FoodItem from '../FoodItem'

import './index.css'

const Home = props => {
  const {restaurantName, tableMenuList} = props
  const menuItems = tableMenuList.map(each => each.menuCategory)

  const newObject = {}

  tableMenuList.forEach(menuItem => {
    const {menuCategory, categoryDishes} = menuItem
    const formattedCategoryDishes = categoryDishes.map(eachDish => ({
      dishId: eachDish.dish_id,
      dishName: eachDish.dish_name,
      dishCurrency: eachDish.dish_currency,
      dishPrice: eachDish.dish_price,
      dishImage: eachDish.dish_image,
      dishCalories: eachDish.dish_calories,
      dishDescription: eachDish.dish_description,
      dishAvailability: eachDish.dish_Availability,
      dishType: eachDish.dish_Type,
      addonCat: eachDish.addonCat,
      quantity: 0,
    }))
    newObject[menuCategory] = formattedCategoryDishes
  })

  const [selectedCategory, setSelectedCategory] = useState(
    tableMenuList[0].menuCategory,
  )
  const [foodItems, setFoodItems] = useState(newObject)
  const [cartCount, setCartCount] = useState(0)

  const onChangeMenuCategory = name => {
    setSelectedCategory(name)
  }

  const onIncreaseQuantity = id => {
    const increasedQuantity = foodItems[selectedCategory].map(each => {
      if (each.dishId === id) {
        return {
          ...each,
          quantity: each.quantity + 1,
        }
      }
      return each
    })
    const updatedFoodItems = {...foodItems}
    updatedFoodItems[selectedCategory] = increasedQuantity
    setFoodItems(updatedFoodItems)
    setCartCount(prev => prev + 1)
  }

  const onDecreaseQuantity = id => {
    const increasedQuantity = foodItems[selectedCategory].map(each => {
      if (each.dishId === id) {
        if (each.quantity !== 0) {
          setCartCount(prev => (prev === 0 ? 0 : prev - 1))
        }
        return {
          ...each,
          quantity: each.quantity === 0 ? 0 : each.quantity - 1,
        }
      }
      return each
    })
    const updatedFoodItems = {...foodItems}
    updatedFoodItems[selectedCategory] = increasedQuantity
    setFoodItems(updatedFoodItems)
  }

  const getSelectedCategoryFoodItem = () => {
    const itemsList = foodItems[selectedCategory]
    return itemsList
  }

  const onLogout = () => {
    const {history} = props
    console.log(props)
    Cookies.remove('jwt_token')
    history.replace('/login')
    return <Redirect to="/login" />
  }

  return (
    <div className="food-app">
      <nav className="nav-bar">
        <Link to="/">
          <h1 className="cafe-name">{restaurantName}</h1>
        </Link>

        <div className="nav-items">
          <p className="my-orders">My Orders</p>
          <div className="cart">
            <Link to="/cart">
              <AiOutlineShoppingCart className="cart-icon" />
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>
        </div>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </nav>
      <ul className="menu-list">
        {menuItems.map(eachItem => (
          <MenuItem
            key={eachItem}
            name={eachItem}
            isSelected={eachItem === selectedCategory}
            onChangeMenuCategory={onChangeMenuCategory}
          />
        ))}
      </ul>
      <ul className="food-items-list">
        {getSelectedCategoryFoodItem().map(eachItem => (
          <FoodItem
            key={eachItem.dishId}
            data={eachItem}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        ))}
      </ul>
    </div>
  )
}

export default Home
