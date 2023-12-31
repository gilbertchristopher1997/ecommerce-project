"use client"
import React, {useContext} from "react";
import {Store} from "@/utils/Store";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import {XCircleIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import dynamic from "next/dynamic";

function CartScreen() {
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {cart: {cartItems}} = state
    const removeItemHandler = (item) => {
        dispatch({type: 'CART_REMOVE_ITEM', payload: item})
    }
    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty)
        console.log(quantity)
        dispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity}})
    }
    return (
        <Layout title={'Shopping Cart'}>
            <h1 className={'mb-4 text-xl'}>Shopping Cart</h1>
            {
                cartItems.length === 0 ?
                    <div>Cart is empty. <Link href={'/'}>Go shopping</Link></div> :
                    (
                        <div className={'grid md:grid-cols-4 md:gap-5'}>
                            <div className={'overflow-x-auto md:col-span-3'}>
                                <table className={'min-w-full'}>
                                    <thead className={'border-b'}>
                                    <tr>
                                        <th className={'px-5 text-left'}>Item</th>
                                        <th className={'p-5 text-right'}>Quantity</th>
                                        <th className={'p-5 text-right'}>Price</th>
                                        <th className={'p5'}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.slug} className={'border-b'}>
                                            <td>
                                                <Link legacyBehavior={true} href={`/product/${item.slug}`}>
                                                    <a className={'flex items-center'}>
                                                        <Image src={item.image} alt={item.name}
                                                               width={50} height={50}
                                                        ></Image>
                                                        &nbsp;
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">
                                                <select
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateCartHandler(item, e.target.value)
                                                    }
                                                >
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className={'p-5 text-right'}>Rp {item.price}</td>
                                            <td className={'p-5 text-center'}>
                                                <button>
                                                    <XCircleIcon className={'h-5 w-5'}
                                                                 onClick={() => removeItemHandler(item)}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={'card p-5 h-fit'}>
                                <ul>
                                    <li>
                                        <div className={'pb-3 text-xl'}>Subtotal
                                            ( {cartItems.reduce((a, c) => a + c.quantity, 0)} ){' '}
                                            : Rp {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</div>
                                    </li>
                                    <li>
                                        <button onClick={() => router.push('/shipping')}
                                                className={'primary-button w-full'}>
                                            Checkout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
            }
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), {ssr: false})