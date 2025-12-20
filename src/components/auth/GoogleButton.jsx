import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleLoginMutation } from '../../redux/feature/auth/authApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/feature/auth/authSlice'; // Import your auth actions

const GoogleButton = ({ setShowSuccessModal }) => {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
      const { given_name, name, email } = credentialResponseDecoded;
    
      const userData = {
        name: name,
        email: email,
        password: given_name,
      };

      const response = await googleLogin(userData).unwrap();
      
      if (response.success) {
        dispatch(setUser({
          user: response.data.user,
          token: response.data.accessToken
        }));

        toast.success(response.message || "Login successful!");
        
        if (setShowSuccessModal) {
          setShowSuccessModal(true);
        }
        
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error?.data?.message || 'Google login failed';
      toast.error(errorMessage);
      console.error('Error with Google login:', error);
    }
  };

  return (
    <div>  
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.log('Login Failed');
          toast.error('Google authentication failed');
        }}
      />
      {isLoading && <p className="text-center mt-2 text-sm">Processing...</p>}
    </div>
  );
};

export default GoogleButton;