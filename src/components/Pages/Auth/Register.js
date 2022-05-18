import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Utilities/Loading';


import "./LoginSignup.css";
import SocialLogin from './SocialLogin';

const Register = () => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [nameError, setNameError] = useState('');
    // const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    // --- 
    // Set registration error 
    const [regError, setRegError] = useState();

    // Validation 
    const handleName = (event) => {
        let getName = event.target.value;
        if (getName.length > 3) {
            setName(getName);
            setNameError(false);
        }
        else {
            setNameError(
                <small className='errorText'>Name Too Short</small>
            )
        }

    }
    
    const handleEmail = (event) => {
        let getEmail = event.target.value;
        setEmail(getEmail);


    }
    // Password length check 
    const handlePassword = (event) => {
        let getPassword = event.target.value;
        if (getPassword.length > 5) {
            setPassword(getPassword);
            setPasswordError(false);
        }
        else {
            setPasswordError(
                <small className='errorText'>Must be 6 Character</small>
            )
        }


    }
    // password match 
    const handleRePassword = (event) => {
        let getRePassword = event.target.value;
        if (getRePassword === password) {
            setRePassword(password);
            setPasswordMatchError(false);

        }
        else {
            setPasswordMatchError(
                <small className='errorText'>Password Didn't match</small>

            );

        }

    }

    // Redirecting user to his prevoius route 
    if (user) {
        navigate(from, { replace: true })
    }
    // Showing loading component  
    if ( loading || updating) {
        return (<Loading></Loading>);
    }
    if (error ) {
            toast.error(error.message);
    }
    if (updateError) {
        toast.error(updateError.message);
    }

    // ----------- SIGN UP PROCESS--------------------
    const handleSignup = async (event) => {
        event.preventDefault();
        
        if (password.length > 5 && password === rePassword) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });

            // -------- Redirecting ----------
            
            await signOut(auth);
            await toast.success("Successfully Registered! Login Now");
            navigate('/login');
    
            

        }
        else {
            setRegError(
                // <small className='errorText'>Please Check errors {updateError}</small>
                <p className='bg-danger text-white p-3'>Please Check Errors</p>
            )
        }

    }




    return (
        <div id='page-login'>
            <div className='login-reg py-5'>
                <Container >
                    <Row>
                        <Col md={7} className="d-flex align-items-center">
                            <h2 className='title'>Create your Account</h2>

                        </Col>
                        <Col md={5}>
                            <div className="form-body">

                                <form onSubmit={handleSignup}>
                                    <label> Name</label>
                                    <input type="text" required onKeyUp={handleName} className={nameError ? 'hasError' : 'noError'} />
                                    {nameError}
                                    <label> Email</label>
                                    <input type="email" required onKeyUp={handleEmail} />
                                    <label> Pasword</label>
                                    <input type="password" required onKeyUp={handlePassword} className={passwordError ? 'hasError' : 'noError'} />
                                    {passwordError}
                                    <label> Confirm Pasword</label>
                                    <input type="password" required onKeyUp={handleRePassword} />
                                    {passwordMatchError}

                                    <Button type="submit" className='Log_in col-12 my-3'>Create Account</Button>
                                    {regError}

                                </form>

                                <SocialLogin></SocialLogin>
                                <div className="p-3"></div>
                                <Row>

                                    <Col md={12}>
                                        <div className='text-center'>Already have an account?</div>
                                        <Link className='nav-link text-white text-center text-decoration-underline' to={"/login"}>Login</Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    {/* ==========TOAST COMPONENT ============  */}

                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </Container>
            </div>

        </div>
    );
};

export default Register;