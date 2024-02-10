import './index.css'

const CategoryItem = props => {
  const {details, onClickItem, isSelected} = props
  const classL = details === isSelected ? 'selected' : 'not-selected'
  const onClick = () => {
    onClickItem(details)
  }
  return (
    <li>
      <button className={`cat-button ${classL}`} onClick={onClick}>
        {details}
      </button>
    </li>
  )
}
export default CategoryItem
