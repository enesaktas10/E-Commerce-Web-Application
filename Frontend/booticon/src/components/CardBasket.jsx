import React from 'react'
import '../style/CardBasket.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function CardBasket({ data }) {

    const MySwal = withReactContent(Swal)
    const imgPath = `src/img/${data.productImage1}.webp`

    const handleClick = () => {
        const token = sessionStorage.getItem('jwtToken')
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
                console.error('istek gondririlken hata olustu', error);
            })
    }

    const handleClick2 = () => {
        const token = sessionStorage.getItem('jwtToken')
        axios.delete(`https://localhost:7023/api/Basket/${data.productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("istek basariyla gondrildi", response.data)
                MySwal.fire({
                    title: 'Silindi!',
                    text: `${data.productName} başarılı bir şekilde sepetten silindi`,
                    icon: 'success',
                    confirmButtonText: 'Tamam'
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch(error => {
                console.error('istek gondririlken hata olustu', error);
            })
    }

    const formattedPrice = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(data.basketItemPrice);
    return (
        <>
            <div className='basketDiv'>
                <div className='basketImg'>
                    <img src={imgPath}></img>
                </div>
                <div className='basketProductDescription'>
                    <p>{data.productDescription}</p>
                </div>
                <div className='basketProductName'>
                    <button onClick={handleClick2} className='buttonEksi'>-</button>
                    <h3><span></span>{data.productUnit}</h3>
                    <button onClick={handleClick} className='buttonArtı'>+</button>
                </div>
                <div className='basketProductPrice'>
                    <p>{formattedPrice} ₺ </p>
                </div>

            </div>
        </>
    )
}

export default CardBasket