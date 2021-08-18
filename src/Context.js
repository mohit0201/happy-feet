import React, { useState, useEffect } from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {
  const [hasFinishedLoading, setHasFinishedLoading] = useState(false)
  const [shoesData, setShoesData] = useState([])
  const [itemToBuy, setItemToBuy] = useState({})
  const [goToPay, setGoToPay] = useState(false)
  const [orderProcessing, setOrderProcessing] = useState(false)
  const [itemsBought, setItemsBought] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [filtersApplied, setFiltersApplied] = useState(false)
  const [minPriceFilter, setMinPriceFilter] = useState(0)
  const [maxPriceFilter, setMaxPriceFilter] = useState(0)

  const url = 'https://5f114cf265dd950016fbd25a.mockapi.io//data'

  useEffect(() => {
    setHasFinishedLoading(false)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setShoesData(data)
        setHasFinishedLoading(true)
      })
  }, [])

  function sortByPrice(order) {
    const listToSort = filtersApplied ? filteredList : shoesData
    if (order === 'ascending') {
      const updatedList = listToSort.sort((itemA, itemB) =>
        Number(itemA.discountedPrice) > Number(itemB.discountedPrice)
          ? 1
          : -1,
      )
      setShoesData([...updatedList])
    } else if (order === 'descending') {
      const updatedList = listToSort.sort((itemA, itemB) =>
        Number(itemA.discountedPrice) < Number(itemB.discountedPrice)
          ? 1
          : -1,
      )
      setShoesData([...updatedList])
    }
  }

  function sortByRelevance() {
    const listToSort = filtersApplied ? filteredList : shoesData
    const updatedList = listToSort.sort((itemA, itemB) =>
      Number(itemA.rating) < Number(itemB.rating) ? 1 : -1,
    )
    setShoesData([...updatedList])
  }

  function filterByBrand(text) {
    setFiltersApplied(true)
    const updatedList = shoesData.filter(
      (item) => item.brand.toLowerCase().indexOf(text) !== -1,
    )
    setFilteredList([...updatedList])
  }

  function filterByPriceRange(minPrice, maxPrice) {
    setFiltersApplied(true)
    if (minPrice) {
      const updatedList = shoesData.filter(
        (shoe) => shoe.discountedPrice >= minPrice,
      )
      setFilteredList([...updatedList])
    } else if (maxPrice) {
      const updatedList = shoesData.filter(
        (shoe) => shoe.discountedPrice <= maxPrice,
      )
      setFilteredList([...updatedList])
    } else if (minPrice && maxPrice) {
      const updatedList = shoesData.filter(
        (shoe) =>
          shoe.discountedPrice >= minPrice &&
          shoe.discountedPrice <= maxPrice,
      )
      setFilteredList([...updatedList])
    } else {
      setFilteredList([...shoesData])
    }
  }

  function filterByColor(checkedColors) {
    setFiltersApplied(true)
    if (!checkedColors.length) {
      setFiltersApplied(false)
    }
    let newList = []
    checkedColors.forEach((color) => {
      const updatedList = shoesData.filter(
        (shoe) => shoe.color === color,
      )
      newList = [...newList, ...updatedList]
    })
    setFilteredList([...newList])
  }

  function buyItem(id) {
    const item = shoesData.find((shoe) => shoe.id === id)
    setItemToBuy({ ...item })
    setGoToPay(true)
  }

  function cancelBuyItem() {
    setItemToBuy({})
    setGoToPay(false)
  }

  function processPayment() {
    setOrderProcessing(true)
    setTimeout(() => {
      setItemsBought([...itemsBought, itemToBuy])
      setItemToBuy({})
      setGoToPay(false)
      setOrderProcessing(false)
    }, 3000)
  }

  return (
    <Context.Provider
      value={{
        hasFinishedLoading,
        shoesData,
        sortByPrice,
        buyItem,
        goToPay,
        cancelBuyItem,
        processPayment,
        orderProcessing,
        itemsBought,
        itemToBuy,
        sortByRelevance,
        filterByBrand,
        filteredList,
        filtersApplied,
        filterByPriceRange,
        filterByColor,
        minPriceFilter,
        setMinPriceFilter,
        maxPriceFilter,
        setMaxPriceFilter,
        setFilteredList,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, ContextProvider }
