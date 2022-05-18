import React from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'

import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import axios from 'axios';

const SocialLogin = () => {
    const [signInWithGoogle, user, gloading, gerror] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    let errormgs;

    if (gerror) {
        errormgs=
          <div>
            <p className='bg-danger text-white p-3'>Error: {gerror.message}</p>
          </div>;
          document.getElementById('google').style.animation="";
        
      }
      if (gloading) {
          document.getElementById('google').style.animation="spinner 5s ease-in 0s infinite alternate";
        // return <p>Loading...</p>;
      }
      if (user) {
        const email = user?.user.email;
        const fetchLogin = async () => {
            const {data} = await axios.post('https://floating-tundra-94246.herokuapp.com/login', {email});
            localStorage.setItem('accessToken', data.accessToken);
        }
        fetchLogin();
        
          navigate(from, {replace:true})
        
        
      }
    return (
        <div>
            <div className="d-flex">
                <div className="col-5"><hr /></div>
                <div className="col-2 text-center py-1">OR</div>
                <div className="col-5"><hr /></div>
            </div>
            
            <p className="text-center">Continue With,</p>
            <div className="d-flex justify-content-center alignment-items-center">
                <div onClick={()=> signInWithGoogle()} className="m-2 social-login " id='google'>
                    <FaGoogle />
                </div>
                <div className="m-2 social-login facebook">
                    <FaFacebookF />
                </div>
            </div>
            {errormgs}
            
        </div>
    );
};

export default SocialLogin;