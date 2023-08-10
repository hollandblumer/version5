import { Flex, Link, useAuthenticator, useTheme } from "@aws-amplify/ui-react";

export function SignInFooter() {
  const { toResetPassword } = useAuthenticator();
  const { toSignUp } = useAuthenticator();
  const { tokens } = useTheme();

  return (
    <div>
      <Flex
        justifyContent="center"
        padding={`0 0 ${tokens.space.medium}`}
        borderRadius="1rem"
      >
        <Link onClick={toResetPassword}> <div className="reset-password-link">Reset your password</div></Link>
      </Flex>

      <div className="create-account-form">
        {" "}
        Don't have an account?
        <Link onClick={toSignUp} >
          <div className="create-account-form-button"> Click here</div>
        </Link>{" "}
      </div>
    </div>
  );
}

export default SignInFooter;
