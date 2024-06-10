import '../style/AddressCard.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function AddressCard() {
    const [Name, setName] = useState('');
    const [Surname, setSurname] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [AddressHeaders, setAddressHeaders] = useState('');
    const [City, setCity] = useState('');
    const [District, setDistrict] = useState('');
    const [OrderAddress, setOrderAddress] = useState('');

    const [order, setOrder] = useState([])

    const MySwal = withReactContent(Swal);

    const navigateTo = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Sayfanın yeniden yüklenmesini önle
        try {
            // API'ye gönderilecek veri
            const userData = {
                Name,
                Surname,
                AddressHeaders,
                City,
                District,
                OrderAddress,
                PhoneNumber
            };

            // Axios kullanarak POST isteği gönder
            const token = sessionStorage.getItem('jwtToken');
            console.log(userData)
            const response = await axios.post('https://localhost:7023/api/Order', userData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(userData);
            // Sunucudan gelen yanıtı kontrol et
            if (response.status === 200) {
                console.log('ENES DOGRUUUUU');
                setOrder(response.data)
                const orderData = response.data;
                console.log(order)
                MySwal.fire({
                    title: 'Başarılı!',
                    text: `${orderData.orderDateTime.substring(0, 10)} Tarihli Siparişiniz Başarılı Bir Şekilde Oluşturuldu !!! Sipraiş Numaranız = ${orderData.orderId}`,
                    icon: 'success',
                    confirmButtonText: 'Tamam'
                })
                navigateTo('/orderSuccess', { state: { order: orderData } });
            } else {
                console.log('Hata var');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='formAddress'>
            <div className='inputNameSurname'>
                <div className='space11'></div>
                <input style={{ margin: '0 10px 0 0' }} type='text' placeholder='Ad' required value={Name} onChange={(e) => setName(e.target.value)} />
                <input type='text' placeholder='Soyad' required value={Surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
            <div className='inputAddressHeader'>
                <div className='space11'></div>
                <input type="text" placeholder='Adres Başlığı : Ev / İşyeri vs.' required value={AddressHeaders} onChange={(e) => setAddressHeaders(e.target.value)} />
            </div>
            <div className='inputPhoneNumber'>
                <div className='space11'></div>
                <input type="phone" placeholder='Telefon Numarası' maxLength="11" required value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className='inputCity'>
                <div className='space11'></div>
                <input style={{ margin: '0 10px 0 0' }} type='text' placeholder='İl' required value={City} onChange={(e) => setCity(e.target.value)} />
                <input type='text' placeholder='İlçe' required value={District} onChange={(e) => setDistrict(e.target.value)} />
            </div>
            <div className='inputAddressInformation'>
                <div className='space11'></div>
                <textarea rows="3" cols="50" placeholder="Adres bilgilerinizi yazınız : Mahalle/Cadde/Sokak/Bina No/Kapı No..." required value={OrderAddress} onChange={(e) => setOrderAddress(e.target.value)}></textarea>
            </div>
            <div className='inputSubmit'>
                <div className='space11'></div>
                <button type='submit'>SİPARİŞİ ONAYLA</button>
            </div>


        </form>
    );
}

export default AddressCard;
