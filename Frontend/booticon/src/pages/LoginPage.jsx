import React from 'react'
import Layout from '../layouts/Layout'
import Login from '../components/Login'

function LoginPage() {
    return (
        <Layout>
            <Login></Login>
            <div style={{
                width: "100%",
                height: "200px"
            }}></div>
        </Layout>
    )
}

export default LoginPage