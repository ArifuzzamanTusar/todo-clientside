
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Utilities/Loading';

import "./LoginSignup.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    const handleEmail = (event) => {
        setEmail(event.target.value)

    }
    if (sending) {
        return(
            <Loading></Loading>
        )
    }
    if (error){
        toast.error(error.message);
    }


    const handlePasswordReset = async (event) => {
        event.preventDefault();
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success("Email Sent! Please check your email inbox / Spam Folder");

        }
       
        else {
            toast.error("Please Enter the email !");
        }
    }

    return (
        <div id='page-forgotpass'>
            <div className='login-reg py-5'>
                <Container >
                    <Row>
                        <Col md={7} className="d-flex align-items-center">
                            <h2 className='title'>RESET Password</h2>

                        </Col>
                        <Col md={5}>
                            <div className="form-body">

                                <form onSubmit={handlePasswordReset} >
                                    <label> Email</label>
                                    <input type="email" onBlur={handleEmail} />



                                    <Button type='submit' className='Log_in col-12 my-3'>Sent Password reset email</Button>

                                </form>


                                <div className="p-3"></div>
                                <Row>
                                    <Col md={6}>
                                        <div className='text-center'>Got password?</div>
                                        <Link className='nav-link text-white text-center text-decoration-underline ' to={"/login"}>Login</Link>
                                    </Col>
                                    <Col md={6}>
                                        <div className='text-center'>Dont have an account?</div>
                                        <Link className='nav-link text-white text-center text-decoration-underline' to={"/register"}>Create New Account</Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

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

export default ForgotPassword;