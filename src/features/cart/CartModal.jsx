import { useSelector, useDispatch } from "react-redux"
import Modal from "../../components/Modal"
import { selectCartItems, selectCartTotalItems, selectCartTotalPrices } from "./cartSlice"
import { addItemToCart, removeItemFromCart } from "../cart/cartSlice";

const CartModal = ({ handleHideModalCart }) => {
    const cartItems = useSelector(selectCartItems)
    const totalItems = useSelector(selectCartTotalItems)
    const totalPrices = useSelector(selectCartTotalPrices)
    const dispatch = useDispatch();

    const handleCheckoutToWhatsapp = () => {
        if (totalItems === 0) return;

        const phoneNumber = "6287709040766";
        const message = encodeURIComponent(
            `Hai, saya ingin membeli ${totalItems} barang dengan total harga ${totalPrices}`
        );

        const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        window.open(URL, "_blank");
    };

    const handleClickBuy = (product) => {
        dispatch(addItemToCart(product))
    }

    const handleRemoveItem = (product) => {
        dispatch(removeItemFromCart(product))
    }

    return(
        <Modal>
            <div className="flex flex-col gap-6 p-1: sm:p-2 w-full lg:w-[900px]">
                <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
                    {cartItems.map((product) => {
                        return(
                            <div
                                key={product.id}
                                className="w-full border-b-4 border-blue-200 pb-4"
                            >
                                <div className="flex items-center w-full">
                                <div className="w-[120px] h-auto overflow-hidden">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain"/>
                                </div>
                                <div className="ml-10 w-[75%]">
                                    <h3 className="capitalize mt-3 text-lg">{product.title}</h3>
                                    <div className="flex items-center gap-2"> 
                                        <h4 className="text-sm">{product.price}</h4>
                                        <h3 className="text-lg font-bold">{product.totalPrice}</h3>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 ml-auto">
                                    <button 
                                    type="button" 
                                    className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                                    onClick={() => handleRemoveItem(product)}
                                    >
                                      -
                                    </button>
                                    <h3>{product.quantity}</h3>
                                    <button 
                                    type="button" 
                                    className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                                    onClick={() => handleClickBuy(product)}
                                    >
                                      +
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h3 className="text-md font-bold">Total Items: {totalItems}</h3>
                    <h3 className="text-md font-bold">Total Prices : {totalPrices}</h3>
                </div>
                <div className="flex items-center justify-between">
                    <button 
                     type="button"
                     className="bg-slate-600 hover:bg-slate-800 text-white py-3 px-8 rounded-xl text-sm"
                     onClick={handleHideModalCart}
                     >
                        Close
                     </button>
                     <button 
                     type="button"
                     className="bg-green-600 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl text-sm"
                     onClick={handleCheckoutToWhatsapp}
                     >
                        Checkout (whatsapp)
                     </button>
                </div>
            </div>
        </Modal>
    )
}

export default CartModal