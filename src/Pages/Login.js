import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Context } from '../Context/Context'
import AlertInfo from '../components/AlertInfo';

const Login = () => {
    // To set user
    const { setUser } = useContext(Context);
    // to use Context or Consume
    const { user } = useContext(Context);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email && !password) {
            setError("Please enter your email and password!")
        } else {
            setLoading(true)
            axios
                .post('http://localhost:8030/login', { email, password })
                .then((response) => {
                    if (response.status === 200) {
                        const res = response.data;
                        setLoading(false)
                        setUser({ username: res.user, token: res.token, isAuthenticated: res.authenticated, role: res.role })
                        // localStorage.setItem('user', response.data.user);
                        // localStorage.setItem('authenticated', response.data.authenticated);
                        localStorage.setItem('token', response.data.token);
                        navigate('/')
                    }
                }).catch((error) => {
                    setLoading(false)
                    setError(error.response.data.message)
                });
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(false)
        }, 7000);
        return () => clearTimeout(timer)
    }, [error])

    return (
        <div className='auth-container'>
            {error && <AlertInfo msg={error} color="danger" />}
            {loading && <Spinner />}
            <div className='d-flex align-items-center justify-content-center h-100'>
                <div className='login-data shadow'>
                    <h2 className='login-data-title fw-bold mb-4'>Sign in to your account</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formPlaintextEmail">
                            <Form.Control placeholder="Email address" onChange={(event) => setEmail(event.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Button variant="primary" className='w-100 fw-bold' onClick={handleSubmit}>Sign in</Button>
                        </Form.Group>
                    </Form>
                    <p>Don't have an account? <Link to='/register'>Register now <i className="fs-4 bi-house"></i></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login