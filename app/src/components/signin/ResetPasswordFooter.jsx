import { useAuthenticator, useTheme } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

export function ResetPasswordFooter() {
    const { toResetPassword } = useAuthenticator();
    const { toSignIn } = useAuthenticator();
    const { tokens } = useTheme();
  
    return (
      <div>
        
  
        <div className="create-account-form">
          {" "}
         
      
          <Link onClick={toSignIn}><div className="sign-in-return-link"> Back to Sign In</div></Link>
         
        </div>
      </div>
    );
  }
  
  export default ResetPasswordFooter;
  