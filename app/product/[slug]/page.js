"use client"

import React, {useContext} from "react";
import Layout from "@/components/Layout";
import data from "@/utils/data";
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {Store} from "@/utils/Store";

export default function ProductScreen() {
    const {state, dispatch} = useContext(Store)
    const router = useRouter()

    const {slug} = useParams()
    const product = data.products.find((x) => x.slug === slug)
    if (!product) {
        return <div>Product not found</div>
    }
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
        <Layout title={product.name}>
            <div className={'py-2'}>
                <Link href={'/'}>back to products</Link>
            </div>
            <div className={'grid md:grid-cols-4 md:gap-3'}>
                <div className={'md:col-span-2'}>
                    <Image src={product.image} alt={product.name} width={640} height={640} layout={'responsive'}></Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className={'text-lg'}>{product.name}</h1>
                        </li>
                        <li>
                            Category: {product.category}
                        </li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>{product.description}</li>
                    </ul>
                </div>
                <div className={'card p-5 h-fit'}>
                    <div className={'mb-2 flex justify-between'}>
                        <div>Price</div>
                        <div>Rp {product.price}</div>
                    </div>
                    <div className={'mb-2 flex justify-between'}>
                        <div>Status</div>
                        <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
                    </div>
                    <button className={'primary-button w-full'} onClick={addToCartHandler}>Add to cart</button>
                </div>
            </div>
        </Layout>
    )
}