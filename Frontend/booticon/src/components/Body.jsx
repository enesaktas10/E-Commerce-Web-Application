import React from 'react'
import '../style/Body.css'
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function Body() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500, // her slaytın geçiş hızı (3 saniye)
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Otomatik oynatma etkinleştirildi
        autoplaySpeed: 3000, // Otomatik oynatma hızı (3 saniye)
        cssEase: 'linear',
        pauseOnHover: true
    };
    return (
        <>
            <div className='sliderDiv'>
                <Slider {...settings}>
                    <div>
                        <img src='src/assets/3.webp' alt="Resim 1" />
                    </div>
                    <div>
                        <img src="src/assets/2.webp" alt="Resim 2" />
                    </div>
                    <div>
                        <img src="src/assets/1.webp" alt="Resim 3" />
                    </div>
                </Slider>
            </div>
        </>

    )
}

export default Body