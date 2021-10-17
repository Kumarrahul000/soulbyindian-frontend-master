import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import './filter.css';
import { Checkbox } from '@material-ui/core';

let TshirtCategories = [
    {Type: "Tshirts", _id: "tshirtFilter", Qty: 57520},
    {Type: "Lounge Tshirts", _id: "loungetshirtFilter", Qty: 654},
];

let color= [
    {Name: "green", _id: "colorNavyblueFilter", Qty: 8792},
    {Name: "blue", _id: "colorBlueFilter", Qty: 7617},
    {Name: "white", _id: "colorWhiteFilter", Qty: 7241},
    {Name: "red", _id: "colorRedFilter", Qty: 6725},
    {Name: "black", _id: "colorBlackFilter", Qty: 2355},
    {Name: "grey", _id: "colorGreyFilter", Qty: 356},
];

function openMenu(){
    var filterSearch = document.querySelectorAll(".filterSearch");

    filterSearch.forEach((e) => {
        const inputSearch = e.querySelector("input");
        e.addEventListener("click", () => {
            inputSearch.classList.toggle("active");
        });
    });
}


  
  const Filter = (props) => {
      
        
    const product = useSelector(state => state.product);
    const priceRange = product.priceRange;
    const dispatch = useDispatch();


    useEffect(() =>{
    const { match } = props;

    // dispatch(getProductsBySlug(match.params.slug));

    }, []);

    return (
        <div className="filterContainer">

            <div className="box categoryFilter" id="categoryFilter">
                <div className="filterTitle">
                    <p>Category</p>
                    <div className="filterSearch" onClick={() => openMenu()}>
                        <input type="search" id="categorySearch" placeholder="Search category" />
                        <span className="searchIcon"><i className="fas fa-search"></i></span>
                    </div>
                </div>
                <ul>
                    {
                        TshirtCategories.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Checkbox onChange={()=><p>Hello</p>} colorPrimary id={item._id} />
                                    <label htmlFor={item._id}>{item.Type} <span className="qty">({item.Qty})</span></label>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="box categoryFilter" id="categoryFilter">
                <div className="filterTitle">
                    <p>PRICE</p>
                    
                </div>
                <ul>
                    {
                        Object.keys(product.productsByPrice).map((e, index) => {
                            return (
                                <li key={index}>
                                    <Checkbox colorPrimary id={index} />
                                    <label htmlFor={index}>{`${props.match.params.slug} under ${priceRange[e]}`}</label>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="box categoryFilter" id="categoryFilter">
                <div className="filterTitle">
                    <p>Color</p>
                    <div className="filterSearch" onClick={() => openMenu()}>
                        <input type="search" id="colorSearch" placeholder="Search Color" />
                        <span className="searchIcon"><i className="fas fa-search"></i></span>
                    </div>
                </div>
                <ul className="colorFilterList">
                    {
                        color.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Checkbox colorPrimary id={item._id} />
                                    <label htmlFor={item._id}><span className="colorView" style={{backgroundColor: `${item.Name}`}}></span> {item.Name} <span className="qty">({item.Qty})</span></label>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Filter
