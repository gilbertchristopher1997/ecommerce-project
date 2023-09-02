"use client"
import React, {useContext, useEffect, useState} from "react";
import Head from "next/head";
import Link from "next/link";
import {Store} from "@/utils/Store";

export default function Layout({children, title = ''}) {
    const {state} = useContext(Store)
    const {cart} = state
    const [cartItemsCount, setCartItemsCount] = useState(0)
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems]);
    return (
        <>
            <Head>
                <title>{title ? title : 'Ecommerce'}</title>
                <meta name={'description'} content={'asdasd'}/>
                <link rel={'icon'} href='../app/favicon.ico'/>
            </Head>
            <div className={'flex min-h-screen flex-col justify-between'}>
                <header>
                    <nav className={'flex h-12 justify-between shadow-md items-center px-4'}>
                        <Link legacyBehavior={true} href={'/'}>
                            <a className={'text-lg font-bold'}>Ecommerce</a>
                        </Link>
                        <div>
                            <Link legacyBehavior={true} href={'/cart'}><a className={'p-2'}>Cart
                                {cartItemsCount > 0 && (
                                    <span
                                        className={'ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'}>
                                        {cartItemsCount}
                                    </span>
                                )}
                            </a></Link>
                            <Link legacyBehavior={true} href={'/order/history'}><a className={'p-2'}>History</a></Link>
                        </div>
                    </nav>
                </header>
                <main className={'container m-auto mt-4 px-4'}>{children}</main>
                <footer className={'flex justify-center items-center h-10 shadow-inner'}>
                    Gilbert Christopher
                </footer>
            </div>
        </>
    )
}