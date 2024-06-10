import React from 'react'
import '../style/MyOrdersCard.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
function MyOrdersCard({ data }) {

    const navigateTo = useNavigate();

    const MySwal = withReactContent(Swal);

    const handleClick = () => {
        const token = sessionStorage.getItem('jwtToken');
        axios.delete(`https://localhost:7023/api/Order/${data.orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("İstek başarılı bir şekilde gönderildi", response.data);


                MySwal.fire({
                    title: 'Başarılı!',
                    text: 'Siparişiniz başarıyla iptal edildi.',
                    icon: 'success',
                    confirmButtonText: 'Tamam'
                }).then((result) => {
                    if (result.isConfirmed) {

                        window.location.reload();
                    }
                });
            })
            .catch(error => {
                console.log("Sipariş iptal edilirken bir hata oluştu", error);


                MySwal.fire({
                    title: 'Hata!',
                    text: 'Sipariş iptal edilirken bir hata oluştu.',
                    icon: 'error',
                    confirmButtonText: 'Tamam'
                });
            });
    };



    const handleClicksss = () => {
        const orderData = data;
        navigateTo('/review', { state: { order: orderData } });
    }

    return (
        <>
            <div className='container'>
                <div className='titlies'>

                    <h3 className='titley'>Siparişin Oluşturulma tarihi = {
                        new Date(data.orderDateTime).toLocaleDateString('tr-TR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })
                    }</h3>
                </div>
                <div className='x'>

                    <div className='w'>
                        <p className='ww'>Sipariş Numarası</p>
                        <p>{data.orderId}</p>

                    </div>


                    <div className='q'>
                        <button onClick={handleClick} className='q1'>Sipraişi İptal Et</button>
                        <button onClick={handleClicksss} className='q2'>İncele</button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default MyOrdersCard