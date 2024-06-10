import React from 'react'
import { useLocation } from 'react-router-dom';
import Layout from '../layouts/Layout'
import { IoMdCheckmark } from "react-icons/io";
function OrderSuccess() {
    const location = useLocation();
    const { state } = location;
    const { order } = state || {};

    console.log(order)
    return (
        <>
            <div>
                <Layout>
                    <div style={{
                        border: '3px solid black',
                        height: '330px',
                        width: '50%',
                        margin: '100px auto 100px auto',
                        padding: '20px',


                    }}>
                        <div style={{

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <h1 style={{
                                color: 'green'
                            }}>Siparişiniz Başarılı Bir Şekilde Oluşturuldu.<IoMdCheckmark /></h1>
                        </div>
                        <div style={{

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '10px 0 0 0 '
                        }}>
                            <p>Sipariş Numarası : {order.orderId}</p>
                        </div>
                        <div style={{

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '10px 0 0 0 '
                        }}>
                            <p>Ad Soyad : {order.name} {order.surname}</p>
                        </div>
                        <div style={{

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '10px 0 0 0 '
                        }}>
                            <p>Telefon Numarası :  {order.phoneNumber}</p>
                        </div>
                        <div style={{

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '10px 0 0 0 '
                        }}>
                            <p>Adres Bilgisi : {order.orderAddress} {order.city} / {order.district}</p>
                        </div>
                    </div>

                </Layout>
            </div>
        </>
    )
}

export default OrderSuccess