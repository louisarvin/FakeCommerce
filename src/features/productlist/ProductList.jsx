import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import { setSortList, selectSortedList } from "../sorting/sortProduct";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const sortedProducts = useSelector(selectSortedList);
    
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try{
                const response = await fetch('https://fakestoreapi.com/products')
                const data = await response.json();
                setProducts(data);
                dispatch(setSortList({ sortList: data, sortBy: 'alphabetical' }));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchProducts();
    }, [dispatch])

    const handleClickBuy = (product) => {
        dispatch(addItemToCart(product))
    }
    
    return(
        <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-4">
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-52 w-52 border-b-4 border-blue-500"></div>
                </div>
            ) : (
                sortedProducts.map((product) => (
                    <div key={product.id} className="group bg-white rounded-xl border shadow p-4 w-full">
                        <div className="relative w-[80%] h-[350px] mx-auto overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out" />
                        </div>
                        <div className="flex flex-col gap-6 mt-8">
                            <button
                                type="button"
                                className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8"
                                onClick={() => handleClickBuy(product)} 
                            >
                                BUY NOW
                            </button>
                            <h3 className="font-bold">{product.title}</h3>
                            <h3>Category : {product.category}</h3>
                            <h3>Rating : {product.rating.rate} ({product.rating.count})</h3>
                            <h3>{product.price}</h3>
                        </div>
                    </div>
                )
            )
        )}
        </div>
    )
}

export default ProductList