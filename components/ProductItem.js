import React, {useContext} from "react";
import Link from "next/link";
import {Store} from "@/utils/Store";
import {useRouter} from "next/navigation";

export default function ProductItem({product}) {
    const {state, dispatch} = useContext(Store)
    const router = useRouter()
    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1

        if (product.countInStock < quantity) {
            alert('Sorry, Product is out of stock')
            return
        }

        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})
        router.push('/cart')
    }
    return (
        <div className={'card'}>
            <Link legacyBehavior={true} href={`/product/${product.slug}`}>
                <a>
                    <img src={product.image} alt={product.name} className={'rounded shadow'} />
                </a>
            </Link>

            <div className={'flex flex-col items-center justify-center p-5'}>
                <Link legacyBehavior={true} href={`/product/${product.slug}`}>
                    <a>
                        <h2 className={'text-lg'}>
                            {product.name}
                        </h2>
                    </a>
                </Link>
                <p className={'mb-2'}>{product.brand}</p>
                <p>Rp {product.price}</p>
                <button className={'primary-button'} type={'button'} onClick={addToCartHandler}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}