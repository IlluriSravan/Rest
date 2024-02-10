import './index.css'
import {Component} from 'react'
import Header from '../Header'
import CategoryItem from '../CategoryItem'

import FoodItem from '../FoodItem'

const categories = [
  'Salads and Soup',
  'From The Barnyard',
  'From the Hen House',
  'Fresh From The Sea',
  'Biryani',
  'Fast Food',
]
class Home extends Component {
  state = {total: [], displayData: [], active: 0}

  componentDidMount() {
    this.getApi()
  }

  getApi = async () => {
    const {active} = this.state
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    const data = await response.json()
    const array = data.map(each => ({
      tableMenuList: each.table_menu_list,
      restaurantName: each.restaurant_name,
    }))

    const totalDetails = array[0]
    const {tableMenuList, restaurantName} = totalDetails
    const format = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes.map(each1 => ({
        dishId: each1.dish_id,
        dishName: each1.dish_name,
        dishAvailability: each1.dish_availability,
        dishCurrency: each1.dish_currency,
        dishType: each1.dish_Type,
        dishCalories: each1.dish_calories,
        dishImage: each1.dish_image,
        dishPrice: each1.dish_price,
        dishDescription: each1.dish_description,
        nexturl: each1.nexturl,
        addonCat: each1.addonCat,
        quantity: 0,
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))
    console.log('format:-->', format)
    console.log('cat', format)
    this.setState({total: format})
    const single = format[active]
    const {categoryDishes} = single
    console.log('CAAAA', categoryDishes)
    this.setState({displayData: categoryDishes})
  }

  onClickItem = sel => {
    const {total} = this.state
    switch (sel) {
      case categories[0]:
        this.setState({displayData: total[0].categoryDishes})
        break
      case categories[1]:
        this.setState({displayData: total[1].categoryDishes})
        break
      case categories[2]:
        this.setState({displayData: total[2].categoryDishes})
        break
      case categories[3]:
        this.setState({displayData: total[3].categoryDishes})
        break
      case categories[4]:
        this.setState({displayData: total[4].categoryDishes})
        break
      case categories[5]:
        this.setState({displayData: total[5].categoryDishes})
        break
      default:
        this.setState({active: 0})
    }
  }

  increment = id => {
    const {displayData} = this.state
    const increasedData = displayData.map(each => {
      if (each.dishId === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({displayData: increasedData})
  }

  decrement = id => {
    const {displayData} = this.state
    const decreasedData = displayData.map(each => {
      if (each.dishId === id) {
        if (each.quantity !== 0) {
          return {...each, quantity: each.quantity - 1}
        }
      }
      return each
    })
    this.setState({displayData: decreasedData})
  }

  render() {
    const {displayData, active} = this.state

    return (
      <>
        <Header />
        {categories.map(each => (
          <CategoryItem
            key={each}
            details={each}
            onClickItem={this.onClickItem}
          />
        ))}

        {displayData.map(each => (
          <FoodItem
            key={each.dishId}
            details={each}
            increment={this.increment}
            decrement={this.decrement}
          />
        ))}
      </>
    )
  }
}
export default Home
