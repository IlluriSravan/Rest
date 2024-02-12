import './index.css'
import CartContext from '../../context/CartContext'

const FoodItem = props => {
  const {data, onIncreaseQuantity, onDecreaseQuantity} = props
  const {
    dishId,
    dishName,
    dishCurrency,
    dishPrice,
    dishImage,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    addonCat,
    quantity,
  } = data

  const itemQuantity = quantity

  const onIncrementQuantity = () => {
    onIncreaseQuantity(dishId, quantity)
  }

  const onDecrementQuantity = () => {
    onDecreaseQuantity(dishId, quantity)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem, cartList} = value
        const addToCart = dishAvailability && quantity > 0
        const onAddCartItem = () => {
          addCartItem(data)
        }
        return (
          <li className="food-item">
            <div className="container-1">
              {dishType === 1 ? (
                <img
                  className="dish-type"
                  src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
                  alt="vegetarian-food-symbol"
                />
              ) : (
                <img
                  className="dish-type"
                  src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png"
                  alt="non-vegetarian-food-symbol"
                />
              )}
              <div className="dish-details">
                <h1 className="dish-name">{dishName}</h1>
                <p className="dish-price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-description">{dishDescription}</p>
                <div className="middle-section">
                  {dishAvailability ? (
                    <div className="dish-availability">
                      <button
                        className="qty-btn"
                        type="button"
                        onClick={onDecrementQuantity}
                      >
                        -
                      </button>

                      <p className="quantity">{itemQuantity}</p>
                      <button
                        className="qty-btn"
                        type="button"
                        onClick={onIncrementQuantity}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <p className="dish-not-availability">Not available</p>
                  )}
                  {addToCart && (
                    <button
                      type="button"
                      onClick={onAddCartItem}
                      className="add-cart-item"
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
                <p className="dish-customizations">
                  {addonCat.length > 0 && 'Customizations available'}
                </p>
              </div>
            </div>
            <div className="container-2">
              <p className="dish-calories">{dishCalories} calories</p>

              <div className="img-container">
                <img src={dishImage} className="dish-image" alt={dishName} />
              </div>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodItem
