import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout';
import { useLocation } from 'react-router-dom';
import '../style/Review.css'
const formatPhoneNumber = (phoneNumber) => {
    // Telefon numarasındaki tüm boşlukları, parantezleri ve diğer karakterleri kaldır
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Numarayı dilimle ve formatla
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        return `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
    }

    return phoneNumber;
};
const PhoneNumber = ({ number }) => {
    return <div>{formatPhoneNumber(number)}</div>;
};

function ProductImage({ imageName }) {
    const imageUrl = `src/img/${imageName}.webp`; // Görüntü yolunu oluşturun
    return <img src={imageUrl} alt="Product" />;
}

const formatPrice = (price) => {
    // TL simgesi ve virgül kullanarak fiyatı biçimlendirin
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
};

const calculateTotalPrice = (ordersInfo) => {
    let totalPrice = 0;
    ordersInfo.forEach(orderInfo => {
        totalPrice += orderInfo.productMoney;
    });
    return totalPrice;
};
function Review({ }) {

    const location = useLocation();
    const { state } = location;
    const { order } = state || {};

    console.log('erhan', order)

    const [ordersInfo, setOrdersInfo] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        axios.get(`https://localhost:7023/api/Order/${order.orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("ENES GAMZE BETUL = ", response.data)
                setOrdersInfo(response.data)
            })

            .catch(error => {
                console.error('istek gondririlken hata olustuu', error);
            })

    }, []);

    const totalPrice = calculateTotalPrice(ordersInfo);

    return (
        <>
            <Layout>
                <div className='reviewContainer'>
                    <h1>Siparis numarasi : {order.orderId} </h1>
                    <h1 className='xx2'>Siparişin Oluşturulma tarihi = {
                        new Date(order.orderDateTime).toLocaleDateString('tr-TR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })
                    }</h1>
                    <h3 className='kisisel'>Kişisel Bilgiler</h3>
                    <div className='adSoyadPhone'>
                        <p>Ad Soyad = {order.name} {order.surname}</p>
                        <p className='tlfn'>Telefon Numarasi = <PhoneNumber number={order.phoneNumber}> </PhoneNumber></p>

                    </div>
                    <h3 className='addresss'>Adres Bilgileri</h3>
                    <h5 className='adrshead'>{order.addressHeaders}</h5>
                    <div>
                        <p className='shrilce'>Şehir / İlçe = {order.city} {order.district}</p>
                        <p className='adres2s'>Adres = {order.orderAddress}</p>
                    </div>
                    <h3 className='addresss'>Satın Alınan Ürünler</h3>
                    <div>
                        {ordersInfo.map((orderInfo, index) => (
                            <div className='xyz' key={index}>
                                <ProductImage key={index} imageName={orderInfo.product.productImage1}></ProductImage>
                                <p className='xyz1'>Ürün Adı: {orderInfo.product.productName}</p>
                                <p className='xyz3'>x{orderInfo.productUnit}</p>
                                <p className='xyz2'>{formatPrice(orderInfo.productMoney)}</p>

                                {/* Diğer bilgileri de aynı şekilde gösterebilirsiniz */}
                            </div>
                        ))}
                        <div className='totalPrice'>
                            Toplam Fiyat = {formatPrice(totalPrice)}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Review