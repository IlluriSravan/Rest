import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import Home from '../Home'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Body = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [restaurantData, setRestaurantData] = useState({})

  useEffect(() => {
    const getRestaurantData = async () => {
      const apiUrl =
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const response = await fetch(apiUrl)
      const data = await response.json()
      if (response.ok) {
        const formattedTableMenuList = data[0].table_menu_list.map(each => ({
          menuCategory: each.menu_category,
          categoryId: each.menu_category_id,
          categoryDishes: each.category_dishes,
        }))
        const formattedData = {
          restaurantName: data[0].restaurant_name,
          tableMenuList: formattedTableMenuList,
        }
        setRestaurantData(formattedData)
        setApiStatus(apiStatusConstants.success)
      }
    }
    getRestaurantData()
  }, [])

  return apiStatus === apiStatusConstants.initial ? (
    <div className="restaurant-app">
      <Loader type="TailSpin" color="#0284c7" height={50} width={50} />
    </div>
  ) : (
    <Home
      restaurantName={restaurantData.restaurantName}
      tableMenuList={restaurantData.tableMenuList}
    />
  )
}

export default Body
