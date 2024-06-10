import React, { useEffect, useState, lazy } from 'react'
import '../style/Card.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

function Card({ data }) {

    const MySwal = withReactContent(Swal);

    const imgPath = `src/img/${data.productImage1}.webp`;

    const navigateTo = useNavigate();

    const handleClick = () => {

        const token = sessionStorage.getItem('jwtToken');
        axios.get(`https://localhost:7023/api/Basket/${data.productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {

                console.log("istek basariyla gondrildi", response.data)

                MySwal.fire({
                    title: 'Başarılı!',
                    text: `${data.productName} başarılı bir şekilde sepete eklendi`,
                    icon: 'success',
                    confirmButtonText: 'Tamam'
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch(error => {
                MySwal.fire({
                    title: 'Başarısız!',
                    text: `Sepete ürün eklemek için önce giriş yapmalısınız`,
                    icon: 'warning',
                    confirmButtonText: 'Tamam'
                })
                console.error('istek gondririlken hata olustu', error);
            })

    };

    const formattedPrice = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(data.productPrice);

    return (
        <>

            <div className='card'>

                <div className='card-img'>
                    <img className='card-imgsettings' src={imgPath}></img>
                </div>
                <h5 style={{ width: "100%", fontSize: "18px" }}>{data.productName}</h5>
                <div style={{ margin: "10px 0 0 0" }} className='card-description'>
                    {data.productDescription}
                </div>
                <div style={{ fontSize: "17px", height: "10px", margin: "20px 0 0 0", fontWeight: "bold" }} className='card-productPrice'>
                    {formattedPrice} TL
                </div>
                <div className='card-button'>
                    <button onClick={handleClick} className='card-buttonsettings' type='button'>
                        SEPETE EKLE
                    </button>
                </div>
            </div>
        </>
    )
}

export default Card