import React, { useEffect, useState } from 'react'
import '../style/Firsatlar.css'
import Card from '../components/Card'
import axios from 'axios'

function Firsatlar() {
    const [product1, setProduct1] = useState([])
    const [product2, setProduct2] = useState([])
    const [product3, setProduct3] = useState([])
    const [product4, setProduct4] = useState([])
    const [product5, setProduct5] = useState([])

    useEffect(() => {
        axios.get(`https://localhost:7023/api/Product/e1b24371-eb57-4ba4-a85d-dd6652cdf915`)
            .then(response => {
                console.log(response.data);
                setProduct1(response.data);
            })
            .catch(error => {
                console.error('There was a problem with the axios request:', error);
            });

        axios.get(`https://localhost:7023/api/Product/626a6e04-22b8-4026-907d-3630b072d601`)
            .then(response => {
                console.log(response.data);
                setProduct3(response.data);
            })
            .catch(error => {
                console.error('There was a problem with the axios request:', error);
            });
        axios.get(`https://localhost:7023/api/Product/eeff631b-5fff-4405-b793-a92bb0c6769d`)
            .then(response => {
                console.log(response.data);
                setProduct2(response.data);
            })
            .catch(error => {
                console.error('There was a problem with the axios request:', error);
            });

        axios.get(`https://localhost:7023/api/Product/3e211215-4ba1-462c-b59d-843aee4d94f8`)
            .then(response => {
                console.log(response.data);
                setProduct4(response.data);
            })
            .catch(error => {
                console.error('There was a problem with the axios request:', error);
            });


    }, []);

    return (
        <>
            <h1 className='firsatlarTitle'>Fırsatlar</h1>
            <div className='containerDiv'>
                <div className='cardOne'>
                    {product1.map((product, index) => (
                        <Card data={product} key={index}>
                            <p>{product.productDescription}</p>
                            <p>{product.productPrice}</p>
                            <p>{product.productName}</p>
                        </Card>
                    ))}
                    {product2.map((product, index) => (
                        <Card data={product} key={index}>
                            <p>{product.productDescription}</p>
                            <p>{product.productPrice}</p>
                            <p>{product.productName}</p>
                        </Card>
                    ))}
                    {product3.map((product, index) => (
                        <Card data={product} key={index}>
                            <p>{product.productDescription}</p>
                            <p>{product.productPrice}</p>
                            <p>{product.productName}</p>
                        </Card>
                    ))}
                    {product4.map((product, index) => (
                        <Card data={product} key={index}>
                            <p>{product.productDescription}</p>
                            <p>{product.productPrice}</p>
                            <p>{product.productName}</p>
                        </Card>
                    ))}


                </div>

            </div>
        </>
    )
}

export default Firsatlar