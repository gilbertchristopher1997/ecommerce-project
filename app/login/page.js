import React from "react";
import Layout from "@/components/Layout";
export default function LoginScreen() {
    return (
        <Layout title={'Login'}>
            <form className={'mx-auto max-w-screen-md'}>
                <h1 className={'mb-4 text-xl'}>Login</h1>
                <div className={'mb-4'}>
                    <label htmlFor={'email'}>Email</label>
                    <input type={'email'} className={'w-full'} id={'email'}/>
                </div>
                <div className={'mb-4'}>
                    <label htmlFor={'password'}>Password</label>
                    <input type={'password'} className={'w-full'} id={'password'}/>
                </div>
                <div className={'mb-4'}>
                    <button className={'primary-button'}>Login</button>
                </div>
                <div className={'mb-4'}>
                    Don&apos;t have an account? &nbsp;
                </div>
            </form>
        </Layout>
    )
}