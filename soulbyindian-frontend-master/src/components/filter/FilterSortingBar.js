import React from 'react'

const FilterSortingBar = () => {
  const Size = ["s", "m", "xl", "xxl", "xxxl"];
  const viewSorting = ["What's New", "Popularity", "Better Discount", "Price: High to Low", "Price: Low to High", "Customer Rating"];

  return (
    <div className="sortingFiltering show-md">
      
      <div className="sortingSec">
      <span>Filter</span>
        
        <div style={{position: "relative"}} id="sizeSorting">
          <button onClick={() => showHideSize()}>Size <span className="downArrow"><i className="fas fa-chevron-down"></i></span></button>

          <div className="optionList" id="sizeList">
            <ul style={{textTransform: "uppercase"}} id="sizeList">
              {
                Size.map((e, index)=>{
                  return(
                    <li key={index}>{e}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>

      </div>

      <div style={{position: "relative", border: "1px solid #ddd"}} id="viewSorting">
        <button onClick={() => showSortingList()} id="sortByBtn">Sort By: Recommended <span className="downArrow"><i className="fas fa-chevron-down"></i></span></button>

        <div className="optionList" id="sortByList">
          <ul>
            {
              viewSorting.map((e, index)=>{
                return(
                  <li key={index}>{e}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
      {/* <select name="Category" id="viewSorting">
        <option value="Sort by:">Sort by: Recommended</option>
          <option value="lowHigh"></option>
          <option value="highLow">Popularity</option>
          <option value="newFeature">Better Discount</option>
          <option value="mostPopular">Price: High to Low</option>
          <option value="mostPopular">Price: Low to High</option>
          <option value="mostPopular">Customer Rating</option>
        </select> */}
    </div>

  )
}
  
function showSortingList() {
  const sortingList = document.querySelector("#sortByList");
  sortingList.classList.toggle("active");
}
function showHideSize() {
  const sizeList = document.querySelector("#sizeList");
  sizeList.classList.toggle("active");
}    

export default FilterSortingBar
