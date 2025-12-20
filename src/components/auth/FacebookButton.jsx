import React from 'react';
import { toast } from 'sonner';
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useGoogleLoginMutation } from '../../redux/feature/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/feature/auth/authSlice';

const FacebookButton = ({ setShowSuccessModal }) => {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation(); // Reuse same mutation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFacebookSuccess = async (response) => {
    try {
      console.log('Facebook data:', response.data);
      const fbData = response.data;
      const { first_name, name, email } = fbData;

      if (!email) {
        toast.error('Email not provided by Facebook');
        return;
      }
console.log(first_name)
      const userData = {
        name: name,
        email: email,
        password: first_name 
      };

      console.log('Sending userData:', userData);

      const apiResponse = await googleLogin(userData).unwrap();
      
      if (apiResponse.success) {
        dispatch(setUser({
          user: apiResponse.data.user,
          token: apiResponse.data.accessToken
        }));

        toast.success(apiResponse.message || "Login successful!");
        
        if (setShowSuccessModal) {
          setShowSuccessModal(true);
        }
        
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error?.data?.message || 'Facebook login failed';
      toast.error(errorMessage);
      console.error('Error with Facebook login:', error);
    }
  };

  const handleFacebookError = (error) => {
    console.log('Facebook login error:', error);
    toast.error('Facebook authentication failed');
  };

  return (
    <div className=''>
      <LoginSocialFacebook
        appId="398969442822456"
        onResolve={handleFacebookSuccess}
        onReject={handleFacebookError}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
      {isLoading && <p className="text-center mt-2 text-sm">Processing...</p>}
    </div>
  );
};

export default FacebookButton;