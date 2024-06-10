import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import AddressCard from '../components/AddressCard'


function OrderAddressPage() {


    return (
        <>
            <Layout>
                <h1 style={{
                    margin: "40px auto 0 auto",

                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                    paddingBottom: "5px",
                }}>Adres Bilgileri</h1>
                <AddressCard>

                </AddressCard>
            </Layout>
        </>
    )
}

export default OrderAddressPage