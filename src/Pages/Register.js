import { useEffect, useState, CSSProperties } from 'react';
import CircleLoader from "react-spinners/CircleLoader";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AlertInfo from '../components/AlertInfo';

function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [roles, setRoles] = useState("");
    const [info, setInfo] = useState(false);
    const [data, setData] = useState("");
    const navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const dataSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios
            .post('http://localhost:8030/users', { email, password, firstName, lastName, mobile, roles }, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                console.log("response successfully recived just before if condition: ", response)
                if (response.status === 201) {
                    // setEmail("");
                    // setPassword("");
                    // setFirstName("");
                    // setLastName("");
                    // setMobile("");
                    // setRoles("");
                    setTimeout(() => {
                        setInfo(true);
                    }, 5000);
                    setData(response)
                    setLoading(false)
                    navigate('/login');
                }
            }).catch((error) => {
                setLoading(false)
                console.log(error)
            });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setInfo(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [info]);

    return (

        <div className='auth-container'>
            {loading && <div className='spinner-container'>
                <div className='spinner-inner'>
                    <CircleLoader
                        color={color}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>}
            {info ? <AlertInfo msg="Account successfully created" color="success" /> : null}
            <div className='d-flex align-items-center justify-content-center h-100'>
                <div className='login-data shadow'>
                    <h2 className='login-data-title fw-bold mb-4'>Create your account</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formPlaintextEmail">
                            <Form.Control type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextEmail">
                            <Form.Control type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextEmail">
                            <Form.Control type="number" placeholder="Mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextEmail">
                            <Form.Control type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Control className="mb-3" size="sm" as="select" onChange={(e) => setRoles(e.target.value)}>
                            <option>Select your role</option>
                            <option value='admin'>admin</option>
                            <option value='student'>student</option>
                        </Form.Control>

                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Button variant="primary" className='w-100 fw-bold' onClick={dataSubmit}>Register</Button>
                        </Form.Group>
                    </Form>
                    <p>Already have an account? <Link to='/login'>Login now</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;