import './index.css'
import CartContext from '../../context/CartContext'

const CartList = props => {
  const {cartItemDetails} = props
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
  } = cartItemDetails

  const itemQuantity = quantity

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value
        const addToCart = dishAvailability && quantity > 0

        const onDecrementQuantity = () => {
          decrementCartItemQuantity(dishId, quantity)
        }

        const onRemove = () => {
          removeCartItem(dishId)
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
                <div className="middle-section">
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
                      onClick={() =>
                        incrementCartItemQuantity(dishId, quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-2">
              <button
                type="button"
                className="add-cart-item"
                onClick={onRemove}
              >
                Remove
              </button>
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

export default CartList
// const onIncrementQuantity = () => {
//           incrementCartItemQuantity(dishId, quantity)
//         }
