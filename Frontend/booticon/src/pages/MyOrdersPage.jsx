import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import axios from 'axios';
import MyOrdersCard from '../components/MyOrdersCard';

function MyOrdersPage() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        axios.get(`https://localhost:7023/api/Order`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("iste data enes", response.data)
                setOrders(response.data)
            })
            .catch(error => {
                console.error('istek gondririlken hata olustu', error);
            })
    }, []);


    return (
        <>

            <Layout>
                <div>
                    <h1 style={{
                        margin: "40px auto 100px auto",
                        border: "1px solid black",
                        width: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "gray",
                        color: "white",
                        borderRadius: "10px",
                        paddingBottom: "5px",
                    }}>Siparişlerim</h1>
                    <div>
                        {orders.map((order, index) => (
                            <MyOrdersCard data={order} key={index}>

                            </MyOrdersCard>
                        ))}
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default MyOrdersPage