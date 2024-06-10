import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductTable({ id }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7023/api/Product/${id}`)
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was a problem with the axios request:', error);
            });
    }, [id]); // id her degistinde calisacak

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{product.productId}</td>
                        <td>{product.productName}</td>
                        <td>{product.productStock}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ProductTable;
