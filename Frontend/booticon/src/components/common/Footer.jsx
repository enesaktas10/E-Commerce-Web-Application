import React from 'react'
import '../../style/Footer.css'
import footer from '../../img/footer.jpg'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
function Footer() {

    return (
        <>
            <div className='footer'>
                <div className='footerDiv'>
                    <img className='footerImg' src={footer}></img>
                </div>
                <div className='footerBottom'>
                    <div className='footerSpace'></div>
                    <div className='footerBottom1'>
                        <div className='footerBottomLeft'>
                            <a href='#'>HAKKINDA</a>
                            <a href='#'>ANASAYFA</a>
                        </div>
                        <div className='footerIcon'>
                            <a href='#'><FaFacebook style={{ color: 'gray' }} /></a>
                            <a href='#'><FaXTwitter style={{ color: 'gray' }} /></a>
                            <a href='#'><FaYoutube style={{ color: 'gray' }} /></a>
                            <a href='#'><FaInstagram style={{ color: 'gray' }} /></a>
                        </div>
                    </div>
                    <div className='footerBottom2'>
                        <div className='footerBottom2Left'>
                            <a className='#'><FaEarthAmericas /></a>
                            <a className='#'>Türkiye/Türkçe</a>
                        </div>
                        <div className='footerBottom2Right'>
                            <a className='#'>GİZLİLİK KOŞULLARI</a>
                            <a className='#'>KULLANIM KOŞULLARI</a>
                            <a className='#'>©TÜM HAKLARI SAKLIDIR</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer