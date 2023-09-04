"use client"
import React, {useContext} from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import {Store} from "@/utils/Store";
import Image from "next/image";
import {useParams} from "next/navigation";

export default function OrderDetailScreen() {
    const {id = 0} = useParams()
    const {state} = useContext(Store)
    const {history = [{cartItems: [], shippingAddress: {}, paymentMethod: ''}]} = state
    const historyData = history[id]

    const itemsPrice = historyData.cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
    const shippingPrice = 10000

    return (
        <Layout title={'Place Order'}>
            <Link href={'/order/history'}>Back to Order History</Link>
            <h1 className={'mb-4 text-xl'}>Order Detail</h1>
            {historyData.cartItems.length === 0 ? (<div>Cart is empty. <Link href={'/'}>Go Shopping</Link></div>) : (
                <div className={'grid md:grid-cols-4 md:gap-5'}>
                    <div className={'overflow-x-auto md:col-span-3'}>
                        <div className={'card p-5 overflow-x-auto'}>
                            <h2 className={'mb-2 text-lg'}>Shipping Address</h2>
                            <div>
                                {historyData.shippingAddress.fullName}, {historyData.shippingAddress.address}, {' '}
                                {historyData.shippingAddress.city}, {historyData.shippingAddress.postalCode}, {' '}
                                {historyData.shippingAddress.country}
                            </div>
                        </div>
                        <div className={'card p-5 overflow-x-auto'}>
                            <h2 className={'mb-2 text-lg'}>Payment Method</h2>
                            <div>{historyData.paymentMethod}</div>
                        </div>
                        <div className={'card p-5 overflow-x-auto'}>
                            <h2 className={'mb-2 text-lg'}>Order Items</h2>
                            <table className="min-w-full">
                                <thead className="border-b">
                                <tr>
                                    <th className="px-5 text-left">Item</th>
                                    <th className="p-5 text-right">Quantity</th>
                                    <th className="p-5 text-right">Price</th>
                                    <th className="p-5 text-right">Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {historyData.cartItems.map((item, idx) => (
                                    <tr key={idx} className="border-b">
                                        <td>
                                            <Link href={`/product/${item.slug}`} className="flex items-center">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={50}
                                                    height={50}
                                                    style={{
                                                        maxWidth: "100%", height: "auto"
                                                    }}/>
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
                        </div>
                    </div>
                    <div className={'card p-5 h-fit overflow-x-auto'}>
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
                                    <div>Rp {historyData.totalPrice}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>)}
        </Layout>)
}