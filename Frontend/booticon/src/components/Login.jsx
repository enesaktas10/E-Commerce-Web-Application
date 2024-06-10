import React from 'react'
import axios from 'axios';
import '../style/Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigateTo = useNavigate();
    const MySwal = withReactContent(Swal);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7023/api/Register/login', { username, password });
            const token = response.data.accessToken;
            sessionStorage.setItem('jwtToken', token);
            console.log(token);

            MySwal.fire({
                title: 'Tebrikler!',
                text: 'Giriş işlemi başarılı bir şekilde gerçekleşti.',
                icon: 'success',
                confirmButtonText: 'Tamam'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigateTo('/');
                }
            });
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Giriş işlemi sırasında bir hata oluştu.');
        }
    };
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="form-group" style={{ margin: "0 0 20px 0" }}>
                    <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                    <label >Username</label>
                    <input type="text" id='username' value={username} className="form-control" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />

                </div>
                <div className="form-group" style={{ margin: "0 0 20px 0" }}>
                    <label >Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="mt-5 mb-3 text-muted">© 2023-2024</p>
            </form>
        </div>
    )
}

export default Login