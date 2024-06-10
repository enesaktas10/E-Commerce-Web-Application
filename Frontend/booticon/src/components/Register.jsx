import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [Name, setName] = useState('');
    const [Surname, setSurname] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Email, setEmail] = useState('');

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const navigateTo = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Sayfanın yeniden yüklenmesini önle
        try {
            // API'ye gönderilecek veri
            const userData = { Name, Surname, Username, Password, ConfirmPassword, Email };

            // Fetch API kullanarak POST isteği gönder
            const response = await fetch('https://localhost:7023/api/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            console.log(userData)
            // Sunucudan gelen yanıtı kontrol et
            if (response.ok) {
                console.log('Kayıt başarıyla tamamlandı!');
                setRegistrationSuccess(true);
                navigateTo('/register-success');
                // Başka bir işlem yapılabilir, örneğin kullanıcıyı yönlendirme
            } else {
                alert('Kayıt işlemi başarısız oldu!');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    return (
        <>
            {registrationSuccess ? (
                <RegisterSuccess />
            ) : (
                <form onSubmit={handleSubmit} className="form-signin" style={{ width: '15%', margin: "100px auto" }}>

                    <h1 className="h3 mb-3 font-weight-normal">Register</h1>

                    <label className="sr-only">Name</label>
                    <input type="text" className="form-control" required="" value={Name} onChange={(e) => setName(e.target.value)} />

                    <label className="sr-only">Surname</label>
                    <input type="text" className="form-control" required="" value={Surname} onChange={(e) => setSurname(e.target.value)} />

                    <label className="sr-only">Username</label>
                    <input type="text" className="form-control" required="" value={Username} onChange={(e) => setUsername(e.target.value)} />

                    <label className="sr-only">Email</label>
                    <input type="email" className="form-control" required="" value={Email} onChange={(e) => setEmail(e.target.value)} />

                    <label className="sr-only">Password</label>
                    <input type="password" className="form-control" required="" value={Password} onChange={(e) => setPassword(e.target.value)} />

                    <label className="sr-only">Confirm Password</label>
                    <input type="password" className="form-control" required="" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className="btn btn-lg btn-primary btn-block" type="submit" style={{ margin: "20px 0" }}>Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2023-2024</p>
                </form>
            )}
        </>
    )
}

export default Register