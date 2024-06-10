import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Layout from '../layouts/Layout';

function MonitorProductsPage() {

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');

    useEffect(() => {
        // Fetch brands
        axios.get('https://localhost:7023/api/Brand')
            .then(response => {
                console.log('Markalar:', response.data);
                setBrands(response.data);
            })
            .catch(error => {
                console.error('Axios isteğinde bir sorun oluştu:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch products
        let url = 'https://localhost:7023/api/Category/4';
        if (selectedBrand) {
            url = `https://localhost:7023/api/Filter/FilterForCategoryAndBrand?categoryId=4&brandId=${selectedBrand}`;
        }
        axios.get(url)
            .then(response => {
                console.log('Ürünler:', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Axios isteğinde bir sorun oluştu:', error);
            });
    }, [selectedBrand]);

    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value;
        setSelectedBrand(selectedBrand);
    };

    return (
        <Layout>
            <h1 style={{ width: '50%', fontFamily: 'revert', margin: '50px 0 0 200px' }}>
                Monitör Satın Alın
            </h1>
            <div style={{ margin: '50px 0 0 200px', display: 'flex' }}>
                <p style={{ fontSize: '25px', fontWeight: 'normal' }}>Tüm modeller.</p>
                <p style={{ fontSize: '25px', fontWeight: 'revert-layer', color: 'gray' }}>Dilediğinizi Seçin.</p>
            </div>

            <div style={{ margin: '20px 0 0 200px' }}>
                <select value={selectedBrand} onChange={handleBrandChange}>
                    <option value="">Tüm Markalar</option>
                    {brands.map(brand => (
                        <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                    ))}
                </select>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '20px 0' }}>
                {products.map((product, index) => (
                    <Card data={product} key={index}>
                        <p>{product.productDescription}</p>
                        <p>{product.productPrice}</p>
                        <p>{product.productName}</p>
                    </Card>
                ))}
            </div>
        </Layout>
    )
}

export default MonitorProductsPage