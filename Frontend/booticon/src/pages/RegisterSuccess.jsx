import React from 'react'
import Layout from '../layouts/Layout'
import '../style/RegisterSuccess.css'
import { IoMdCheckmark } from "react-icons/io";
function RegisterSuccess() {
    return (
        <div>
            <Layout>
                <h1 className='title-success'>Kayıt işlemiş başarılı bir şekilde gerçekleşti.<IoMdCheckmark className='check' /></h1>
                <div className='scslgn'><a className='successpage-login' href='/login'>Giriş Yap</a></div>
                <div style={{
                    width: "100%",
                    height: "500px"
                }}></div>
            </Layout>


        </div>
    )
}

export default RegisterSuccess