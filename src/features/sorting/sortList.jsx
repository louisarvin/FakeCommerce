// SortList.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    sortAlphabetical,
    sortPriceHighest,
    sortPriceLowest,
    sortReverseAlphabetical,
    filterByCategory,
    searchProducts,
    selectSortedList
} from "./sortProduct";

const SortList = () => {
    const dispatch = useDispatch();
    const [sortOption, setSortOption] = useState('alphabetical');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const sortList = useSelector(selectSortedList);

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortOption(value);
        switch (value) {
            case 'alphabetical':
                dispatch(sortAlphabetical());
                break;
            case 'reverseAlphabetical':
                dispatch(sortReverseAlphabetical());
                break;
            case 'priceHighest':
                dispatch(sortPriceHighest());
                break;
            case 'priceLowest':
                dispatch(sortPriceLowest());
                break;
            default:
                break;
        }
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        dispatch(filterByCategory(value));
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        dispatch(searchProducts(value));
    };

    return (
        <div className=''>
            <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-4">
                <select onChange={handleSortChange} value={sortOption} className="border p-2 rounded">
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                    <option value="reverseAlphabetical">Alphabetical (Z-A)</option>
                    <option value="priceHighest">Price (Highest)</option>
                    <option value="priceLowest">Price (Lowest)</option>
                </select>
                <select onChange={handleCategoryChange} value={selectedCategory} className="border p-2 rounded">
                    <option value="">All Categories</option>
                    {sortList.map((product) => (
                        <option key={product.category} value={product.category}>{product.category}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border p-2 rounded"
                />
            </div>
        </div>
    );
};

export default SortList;
