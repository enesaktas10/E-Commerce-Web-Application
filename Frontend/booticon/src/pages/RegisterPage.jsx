import React from 'react'
import Title from '../components/common/Title'
import Nav from '../components/common/Nav'
import Register from '../components/Register'
import '../style/RegisterPage.css'
import Layout from '../layouts/Layout'
function RegisterPage() {
    return (
        <>
            <Layout>
                <Register></Register>
            </Layout>

        </>
    )
}

export default RegisterPage