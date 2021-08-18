import React, { useContext } from 'react'
import { Context } from '../Context'

function SortItemBar() {
  const {
    sortByPrice,
    sortByRelevance,
    filtersApplied,
    filteredList,
  } = useContext(Context)

  return (
    <main className="sort-bar">
      <p className="sort-text">Sort By</p>
      <button
        className="sort-button relevance"
        onClick={() => sortByRelevance()}
      >
        Relevance
      </button>
      <button
        className="sort-button low-to-high"
        onClick={() => sortByPrice('ascending')}
      >
        Price - Low to High
      </button>
      <button
        className="sort-button high-to-low"
        onClick={() => sortByPrice('descending')}
      >
        Price - High to Low
      </button>
      {filtersApplied ? (
        <p className="filtered-results-count">{`${filteredList.length} results`}</p>
      ) : (
        <></>
      )}
    </main>
  )
}

export default SortItemBar
