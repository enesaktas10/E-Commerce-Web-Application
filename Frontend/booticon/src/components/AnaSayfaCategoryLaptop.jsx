import React, { useState, useEffect } from 'react';
import '../../src/style/AnaSayfaCategoryLaptop.css';

function AnaSayfaCategoryLaptop() {
    const [scrollY, setScrollY] = useState(window.scrollY);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        const onScroll = () => {
            window.requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', onScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // Calculate width based on scrollY
    const calculateWidth = () => {
        const initialWidth = 100; // Initial width in percentage
        const maxReduction = 20; // Maximum reduction in percentage
        const scrollFactor = 500; // Factor to control the sensitivity of the scroll effect

        const newWidth = initialWidth - (scrollY / scrollFactor) * maxReduction;
        return newWidth < (initialWidth - maxReduction) ? (initialWidth - maxReduction) : newWidth;
    };

    return (
        <>
            <div className='containerDiv1'>
                <h1>Laptop</h1>
                <h3>Çok sevilmek için tasarlandı.</h3>
            </div>
            <div className='containerDiv2'>
                <img
                    src='https://dlcdnwebimgs.asus.com/gain/5FC8A570-B76E-42F0-ABCC-4A08B5E676A9'
                    style={{ width: `${calculateWidth()}%` }}
                    alt="Laptop"
                />
            </div>
        </>
    );
}

export default AnaSayfaCategoryLaptop;
