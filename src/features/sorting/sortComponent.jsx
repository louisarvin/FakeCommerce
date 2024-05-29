import { useDispatch } from 'react-redux';
import { addItemToCart } from '../cart/cartSlice';

const SortComponent = ({ products, sortOption }) => {
    const dispatch = useDispatch();

    const sortedProducts = products.sort((a, b) => {
      switch (sortOption) {
        case 'alphabetical-asc':
          return a.title.localeCompare(b.title);
        case 'alphabetical-desc':
          return b.title.localeCompare(a.title);
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    const handleClickBuy = (product) => {
      dispatch(addItemToCart(product))
  }

    return (
        <div>
          {sortedProducts.map((product) => (
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
          ))}
        </div>
      );
    };

export default SortComponent;
	