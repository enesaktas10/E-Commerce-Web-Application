import React from 'react'
import '../style/Categories.css'
import laptop from '../img/categoryLaptop.webp'
import mouse from '../img/categoryMouse.webp'
import keyboard from '../img/categoryKeyboard.webp'
import monitor from '../img/categoryMonitor.webp'
import headphone from '../img/categoryHeadphone.webp'
function Categories() {

    return (
        <>
            <h3 className='categoriesTitle'>KATEGORİLER</h3>
            <div className='categoryRow1'>

                <a href='#' className='categoryLaptopTag'>
                    <div className='categoryLaptopImg'>
                        <img src={laptop}></img>
                    </div>
                    <div className='categoryLaptopTitle'>LAPTOP</div>
                </a>
                <a href='#' className='categoryLaptopTag'>
                    <div className='categoryLaptopImg'>
                        <img src={mouse}></img>
                    </div>
                    <div className='categoryLaptopTitle'>MOUSE</div>
                </a>
                <a href='#' className='categoryLaptopTag'>
                    <div className='categoryLaptopImg'>
                        <img src={keyboard}></img>
                    </div>
                    <div className='categoryLaptopTitle'>KEYBOARD</div>
                </a>
            </div>
            <div className='categoryRow2'>
                <a href='#' className='categoryLaptopTag'>
                    <div className='categoryLaptopImg'>
                        <img src={monitor}></img>
                    </div>
                    <div className='categoryLaptopTitle'>MONITOR</div>
                </a>
                <a href='#' className='categoryLaptopTag'>
                    <div className='categoryLaptopImg'>
                        <img src={headphone}></img>
                    </div>
                    <div className='categoryLaptopTitle'>HEADPHONE</div>
                </a>
            </div>
        </>
    )
}

export default Categories