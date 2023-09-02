import React from "react";

export default function CheckoutWizard({activeSet = 0}) {
    return (
        <div className={'mb-5 flex flex-wrap'}>
            {
                ['Shipping Address', 'Payment Method', 'Place Order'].map((item, idx) => (
                    <div key={idx}
                         className={`flex-1 border-b-2 text-center 
                         ${idx <= activeSet ? 'border-indigo-500 text-indigo-500' : 'border-gray-500 text-gray-500'}`}>
                        {item}
                    </div>
                ))
            }
        </div>
    )
}