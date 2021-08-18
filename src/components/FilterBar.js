import React, { useState, useContext, Fragment } from 'react'
import { Context } from '../Context'

const checkboxColors = [
  { _id: 1, color: 'Blue' },
  { _id: 2, color: 'Black' },
  { _id: 3, color: 'Gray' },
  { _id: 4, color: 'Brown' },
  { _id: 5, color: 'Khaki' },
  { _id: 6, color: 'Red' },
  { _id: 7, color: 'Green' },
]

function FilterBar() {
  const [checked, setChecked] = useState([])
  const {
    filterByBrand,
    filterByPriceRange,
    filterByColor,
    setMinPriceFilter,
    setMaxPriceFilter,
  } = useContext(Context)

  function handleBrandChange(event) {
    event.preventDefault()
    const { value } = event.target
    filterByBrand(value.toLowerCase())
  }
  function handlePriceChange(event) {
    event.preventDefault()
    const { value, name } = event.target
    let min, max
    if (name === 'minPrice') {
      setMinPriceFilter(value)
      min = value
    } else if (name === 'maxPrice') {
      setMaxPriceFilter(value)
      max = value
    }
    filterByPriceRange(min, max)
  }

  function handleToggle(item) {
    const currentColor = checked.indexOf(item.color)
    const newChecked = [...checked]
    if (currentColor === -1) {
      newChecked.push(item.color)
    } else {
      newChecked.splice(currentColor, 1)
    }
    setChecked(newChecked)
    filterByColor(newChecked)
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  const checkboxes = checkboxColors.map((item) => (
    <Fragment key={item._id}>
      <input
        type="checkbox"
        label={item.color}
        checked={checked.indexOf(item.color) === -1 ? false : true}
        onChange={() => handleToggle(item)}
      />
      <span
        style={{
          backgroundColor: `${item.color}`,
          height: '15px',
          width: '15px',
          borderRadius: '50%',
          display: 'inline-block',
          margin: '0 5px 0 5px',
        }}
      ></span>
      <span style={{ fontSize: '14px' }}>{item.color}</span>
      <br />
    </Fragment>
  ))

  return (
    <main className="filter-bar">
      <p className="form-head">Filters</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <p className="form-label">PRICE</p>
        <select
          className="price-filter"
          name="minPrice"
          onChange={handlePriceChange}
        >
          <option value="">Min</option>
          <option value="999">999</option>
          <option value="1499">1499</option>
          <option value="1999">1999</option>
          <option value="2499">2499</option>
          <option value="3999">3999+</option>
        </select>
        <span className="price-filter-text">to</span>
        <select
          className="price-filter"
          name="maxPrice"
          onChange={handlePriceChange}
        >
          <option value="">Max</option>
          <option value="999">999</option>
          <option value="1499">1499</option>
          <option value="1999">1999</option>
          <option value="2499">2499</option>
          <option value="2999">2999</option>
          <option value="3999">3999</option>
        </select>
        <p className="form-label">BRAND</p>
        <i className="fa fa-search" aria-hidden="true"></i>
        <input
          className="brand-input"
          placeholder="Search Brand"
          onChange={handleBrandChange}
        />
        <p className="form-label">COLOR</p>
        {checkboxes}
      </form>
    </main>
  )
}

export default FilterBar
