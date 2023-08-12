import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Header from "./Header";
import SignInHeader from './SignInHeader';
import SignInFooter from './SignInFooter';
import SignUpHeader from '../signup/SignUpHeader';
import SignUpFooter from '../signup/SignUpFooter';
import ResetPasswordHeader from './ResetPasswordHeader';
import "../../styles/signin/signin.css"


export function SignInComponent () {
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);
 
  useEffect(() => {
    // Check if the user is already authenticated
    Auth.currentAuthenticatedUser()
    .then(user => {
      if (!hasRedirected) {
        if (user && !user.attributes.given_name) {
          // User has signed up but hasn't filled out the required fields
          navigate('/complete-profile');
        } else {
          navigate('/');
          refreshPage();
          setHasRedirected(true);
        }
      }
    })
      .catch(() => {
        // User is not authenticated, continue rendering the sign-in component
      });
  }, [navigate, hasRedirected]);
  
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="fill-background">

   
    </div>
  );
};

export default withAuthenticator(SignInComponent, {
  components: {
    Header,
  
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter,
    },
    SignUp: {
      Header: SignUpHeader,
      Footer: SignUpFooter,
    },
    ResetPassword: {
      Header: ResetPasswordHeader,
    },
  },

  hideSignUp: false,

  formFields: {

    forceNewPassword: {
     password: {
        labelHidden: true,
        placeholder: "Enter New Password",
        isRequired: true,
        order: 1
      },

      confirm_password: {
        labelHidden: true,
        placeholder: "Confirm Password",
        isRequired: true,
        order: 2
      },

      given_name: {
        labelHidden: true,
        placeholder: "First Name",
        isRequired: true,
        order: 3
      },

      family_name: {
        labelHidden: true,
        placeholder: "Last Name",
        isRequired: true,
        order: 4
      },
  


    },

    resetPassword: {
      username: {
        labelHidden: true,
        placeholder: "Enter your email",
        isRequired: true,
       
     
     
      }
  
     
    },
  
    signUp: {
        email: {
        labelHidden: true,
        placeholder: "Email",
        isRequired: true,
        label: "First Name",
      },
      password :{
        labelHidden: true,
        placeholder: "Password",
        isRequired: true,
        label: "First Name",
      },
        confirm_password :{
        labelHidden: true,
        placeholder: "Confirm Password",
        isRequired: true,
        label: "First Name",
      },
      given_name: {
        labelHidden: true,
        placeholder: "First Name",
        isRequired: true,
        label: "First Name",
        order: 1,
      },
     family_name: {
        labelHidden: true,
        placeholder: "Last Name",
        isRequired: true,
        label: "Last Name:",
        order: 2,
      },

    },

    signIn: {
      username: {
        labelHidden: true,
        placeholder: "Email",
        isRequired: true,
       
      },
      password: {
        labelHidden: true,
        placeholder: "Password",
        isRequired: true,
       
      },
    },

   
  },

  authState: 'signIn',
 
});
