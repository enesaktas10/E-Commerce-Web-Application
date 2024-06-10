import React, { useEffect, useState } from 'react'
import '../../style/Nav.css'
import { SlBasket } from "react-icons/sl";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { IoIosLaptop } from "react-icons/io";
import { CiDesktopMouse1 } from "react-icons/ci";
import { CiKeyboard } from "react-icons/ci";
import { CiMonitor } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function Nav() {
    const MySwal = withReactContent(Swal);
    const [basketProductQuantity, setBasketProductQuantity] = useState(0);

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        axios.get(`https://localhost:7023/api/Basket/GetAllItems`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {

                if (response.data.length > 0) {
                    setBasketProductQuantity(response.data[0].basketProductQuantity);
                }
            })
            .catch(error => {
                console.error('istek gondririlken hata olustu', error);
            })
    }, []);

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        axios.get(`https://localhost:7023/api/Order`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {

                setOrders(response.data)
            })

            .catch(error => {
                console.error('istek gondririlken hata olustu', error);
            })
    }, []);

    const navigateTo = useNavigate();

    const handleLogOut = async (event) => {
        MySwal.fire({
            title: '',
            text: 'Çıkış işlemi başarılı bir şekilde gerçekleşti.',
            icon: 'success',
            confirmButtonText: 'Tamam'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('jwtToken');
                navigateTo('/');
            }
        });
    };

    const handleCategoryLaptop = () => {
        navigateTo('/laptopProductsPage')
    }

    const handleCategoryMouse = () => {
        navigateTo('/mouseProductsPage')
    }

    const handleCategoryKeyboard = () => {
        navigateTo('/keyboardProductsPage')
    }

    const handleCategoryMonitor = () => {
        navigateTo('/monitorProductsPage')
    }

    const handleCategoryHeadphone = () => {
        navigateTo('/headphoneProductsPage')
    }

    return (
        <div className='nav'>
            <div className='nav2'>
                <div className='title'><a href='/'>Ana Sayfa</a></div>
                <div className='navSpace'></div>
                <div className='navCategory'>
                    <button onClick={handleCategoryLaptop} className='categoryLaptop'>
                        <IoIosLaptop style={{
                            height: '50px',
                            width: '50px'
                        }} />
                        <p>
                            Laptop
                        </p>
                    </button>
                    <button onClick={handleCategoryMouse} className='categoryMouse'>
                        <CiDesktopMouse1 style={{
                            height: '50px',
                            width: '40px'
                        }} />
                        <p>
                            Mouse
                        </p>
                    </button>
                    <button onClick={handleCategoryKeyboard} className='categoryKeyboard'>
                        <CiKeyboard style={{
                            height: '50px',
                            width: '40px'
                        }} />
                        <p >
                            Klavye
                        </p>
                    </button>

                    <button onClick={handleCategoryMonitor} className='categoryMonitor'>
                        <CiMonitor style={{
                            height: '50px',
                            width: '40px'
                        }} />
                        <p>
                            Monitor
                        </p>
                    </button>
                    <button onClick={handleCategoryHeadphone} className='categoryHeadphone'>
                        <CiHeadphones style={{
                            height: '50px',
                            width: '40px'
                        }} />
                        <p>
                            Kulaklık
                        </p>
                    </button>
                </div>
                <div className='navSpace2'></div>
                <div className='navRight'>
                    {
                        sessionStorage.getItem('jwtToken')
                            ?
                            <>
                                <a className='linkSiparsilerim' href='/myOrdersPage'>
                                    Siparişlerim ({orders.length})
                                </a>
                                <a className='basketLogo' href="/basketPage"><SlBasket style={{ fontSize: "25px", color: 'black' }} /> <p>( {basketProductQuantity})</p></a>
                                <a className='signOutLogo' onClick={handleLogOut} href="#"><PiSignOutBold style={{ fontSize: "25px", color: 'black' }} /></a>
                            </>
                            :
                            <>
                                <div className='navLogin'><a href="/login" >Giriş Yap</a></div>
                                <div className='navRegister'><a href="/register" >Kayıt Ol</a></div>
                            </>

                    }



                </div>
            </div>
        </div>

    )
}

export default Nav