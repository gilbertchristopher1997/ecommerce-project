"use client"
import React, {useContext, useEffect, useState} from "react";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";
import {useRouter} from "next/navigation";
import {Store} from "@/utils/Store";
import {toast} from "react-toastify";
import Cookies from "js-cookie";

export default function PaymentScreen() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const {state, dispatch} = useContext(Store)
    const {cart} = state
    const {shippingAddress, paymentMethod} = cart
    const router = useRouter()
    const submitHandler = (e) => {
        e.preventDefault()
        if (!selectedPaymentMethod) {
            return toast.error('Payment method is required')
        }
        dispatch({type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod})
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod
            })
        )
        router.push('/placeorder')
    }
    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/shipping')
        }
        setSelectedPaymentMethod(paymentMethod || '')
    }, [paymentMethod, router, shippingAddress.address]);
    return (
        <Layout title={'Payment'}>
            <CheckoutWizard activeSet={1} />
            <form className={'mx-auto max-w-screen-md'} onSubmit={submitHandler}>
                <h1 className={'mb-4 text-xl'}>Payment Method</h1>
                {
                    ['PayPal', 'Cash on Delivery'].map((item) => (
                        <div key={item} className={'mb-4'}>
                            <input name={'paymentMethod'}
                                   className={'p-2 outline-none focus:ring-0'}
                                   id={item}
                                   type={'radio'}
                                   checked={selectedPaymentMethod === item}
                                   onChange={() => setSelectedPaymentMethod(item)}
                            />
                            <label className={'p-2'} htmlFor={item}>{item}</label>
                        </div>
                    ))
                }
                <div className={'mb-4 flex justify-between'}>
                    <button className={'default-button'}
                            type={'button'}
                            onClick={() => router.push('/shipping')}>
                        Back
                    </button>
                    <button className={'primary-button'}>
                        Next
                    </button>
                </div>
            </form>
        </Layout>
    )
}