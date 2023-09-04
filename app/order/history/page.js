"use client"
import React, {useContext, useEffect, useReducer} from "react";
import Layout from "@/components/Layout";
import {Store} from "@/utils/Store";
import Link from "next/link";
import dynamic from "next/dynamic";

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATA':
            return {...state, loading: false, orders: action.payload, error: ''}
        default:
            return state
    }
}

function OrderHistoryScreen() {
    const [{loading, error, orders}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        orders: []
    })
    const {state} = useContext(Store)
    const {history} = state

    useEffect(() => {
        const fetchHistory = () => {
            dispatch({type: 'FETCH_DATA', payload: history})
        }
        fetchHistory()
    }, []);
    return (
        <Layout title={'Order History'}>
            {loading ? <div>Loading...</div> : error ? <div>Error</div> :
                orders.length > 0 ?
                    (<div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b">
                            <tr>
                                <th className="px-5 text-left">ID</th>
                                <th className="p-5 text-left">DATE</th>
                                <th className="p-5 text-left">TOTAL</th>
                                <th className="p-5 text-left">ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className=" p-5 ">{idx}</td>
                                    <td className=" p-5 ">02/09/2023</td>
                                    <td className=" p-5 ">Rp {order.totalPrice}</td>
                                    <td className=" p-5 ">
                                        <Link href={`/order/${idx}`} passHref={true}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>) :
                    <div>No data</div>
            }
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(OrderHistoryScreen), {ssr: false})