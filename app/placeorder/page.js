"use client"
import React, {useContext, useEffect, useState} from "react";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";
import Link from "next/link";
import {Store} from "@/utils/Store";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

export default function PlaceOrderScreen() {
    const {state, dispatch} = useContext(Store)
    const {cart, history} = state
    const {cartItems, shippingAddress, paymentMethod} = cart

    const router = useRouter();

    const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

    const shippingPrice = 10000
    const totalPrice = itemsPrice + shippingPrice

    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment')
        }
    }, [paymentMethod, router]);

    const [loading, setLoading] = useState(false)

    const placeOrderHandler = () => {
        setLoading(true)
        Cookies.set('history', JSON.stringify([
            ...history,
            {...cart, totalPrice}
        ]))
        Cookies.set('cart', JSON.stringify({
            ...cart,
            cartItems: []
        }))
        console.log(history)
        dispatch({type: 'CART_CLEAR_ITEMS', payload: totalPrice})
        setLoading(false)
        router.push('/order/history')
    }

    return (
        <Layout title={'Place Order'}>
            <CheckoutWizard activeSet={2}/>
            <h1 className={'mb-4 text-xl'}>Place Order</h1>
            {cartItems.length === 0 ? (<div>Cart is empty. <Link href={'/'}>Go Shopping</Link></div>) : (
                <div className={'grid md:grid-cols-4 md:gap-5'}>
                    <div className={'overflow-x-auto md:col-span-3'}>
                        <div className={'card p-5'}>
                            <h2 className={'mb-2 text-lg'}>Shipping Address</h2>
                            <div>
                                {shippingAddress.fullName}, {shippingAddress.address}, {' '}
                                {shippingAddress.city}, {shippingAddress.postalCode}, {' '}
                                {shippingAddress.country}
                            </div>
                            <div>
                                <Link href={'/shipping'}>Edit</Link>
                            </div>
                        </div>
                        <div className={'card p-5'}>
                            <h2 className={'mb-2 text-lg'}>Payment Method</h2>
                            <div>{paymentMethod}</div>
                            <div>
                                <Link href={'/payment'}>Edit</Link>
                            </div>
                        </div>
                        <div className={'card p-5'}>
                            <h2 className={'mb-2 text-lg'}>Order Items</h2>
                            <table className="min-w-full">
                                <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Item</th>
                                    <th className="    p-5 text-right">Quantity</th>
                                    <th className="  p-5 text-right">Price</th>
                                    <th className="p-5 text-right">Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item, idx) => (<tr key={idx} className="border-b">
                                        <td>
                                            <Link href={`/product/${item.slug}`} className="flex items-center">

                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={50}
                                                    height={50}
                                                    style={{
                                                        maxWidth: "100%", height: "auto"
                                                    }} />
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className=" p-5 text-right">{item.quantity}</td>
                                        <td className="p-5 text-right">Rp {item.price}</td>
                                        <td className="p-5 text-right">
                                            Rp {item.quantity * item.price}
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                            <div>
                                <Link href={"/cart"}>Edit</Link>
                            </div>
                        </div>
                    </div>
                    <div className={'card p-5 h-fit'}>
                        <h2 className={'mb-2 text-lg'}>Order Summary</h2>
                        <ul>
                            <li>
                                <div className={'mb-2 flex justify-between'}>
                                    <div>Items</div>
                                    <div>Rp {itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className={'mb-2 flex justify-between'}>
                                    <div>Shipping</div>
                                    <div>Rp {shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className={'mb-2 flex justify-between font-bold'}>
                                    <div>Total</div>
                                    <div>Rp {totalPrice}</div>
                                </div>
                            </li>
                            <li>
                                <button className={'primary-button w-full'}
                                        disabled={loading}
                                        onClick={placeOrderHandler}
                                >
                                    {loading ? 'Loading...' : 'Place Order'}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>)}
        </Layout>)
}