import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout'
import axios from 'axios';
import CardBasket from '../components/CardBasket';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function BasketPage() {

    const [items, setItems] = useState([])
    const [ItemsPrice, setItemsPrice] = useState(0);
    const [basketProductQuantity, setBasketProductQuantity] = useState(0);

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        axios.get(`https://localhost:7023/api/Basket/GetAllItems`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.length > 0) {
                    setItemsPrice(response.data[0].basketPrice);
                }
                if (response.data.length > 0) {
                    setBasketProductQuantity(response.data[0].basketProductQuantity);
                }


                console.log("istek basariyla gondrildi", ItemsPrice)
                console.log("asdasdasdall data", response.data)
                setItems(response.data)
            })
            .catch(error => {
                console.error('istek gondririlken hata olustu', error);
            })
    }, []);


    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (basketProductQuantity === 0) {
            MySwal.fire({
                title: 'Dikkat!',
                text: 'Sepetinizde ürün bulunmamaktadır.',
                icon: 'warning',
                confirmButtonText: 'Tamam'
            });
        } else {
            navigate('/orderAddressPage');
        }
    };

    const formattedPrice = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(ItemsPrice);

    return (
        <>
            <Layout>
                <h1 style={{
                    margin: "40px auto 0 auto",
                    border: "1px solid black",
                    width: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "gray",
                    color: "white",
                    borderRadius: "10px",
                    paddingBottom: "5px",
                }}>Sepetim</h1>
                <div style={{ display: 'flex' }}>
                    <div className='mainDiv'>

                        <div style={{
                            display: 'block',
                            width: '60%',
                            margin: "20px auto 0 auto"
                        }}>
                            {items.map((product, index) => (
                                <CardBasket data={product} key={index}>
                                    <p>{product.basketItemPrice}</p>
                                    <p>{product.productUnit}</p>

                                </CardBasket>
                            ))}
                        </div>

                    </div>
                    <div className='sepetiOnayla'>
                        <h3>Sipariş Özeti</h3>

                        <p style={{ width: '70%', backgroundColor: 'white' }}>Sepetinizdeki toplam ürün sayısı =  {basketProductQuantity}  </p>

                        <p style={{ width: '80%', backgroundColor: 'white' }}>Sepetinizin toplam tutarı = {formattedPrice} ₺</p>

                        <button onClick={handleButtonClick} className='btnSepeyOnayla'>SEPETİ ONAYLA</button>


                    </div>
                </div>
            </Layout>
        </>
    )
}

export default BasketPage