import { Flex, Link, useAuthenticator, useTheme } from "@aws-amplify/ui-react";

export function SignInFooter() {
  const { toResetPassword } = useAuthenticator();
  const { tokens } = useTheme();

  return (
    <div>
      <Flex
        justifyContent="center"
        padding={`0 0 ${tokens.space.medium}`}
        borderRadius="1rem"
      >
        <Link onClick={toResetPassword}>Reset your password</Link>
      </Flex>

      <div className="create-account-form">
        {" "}
        Don't have an account?
        <a href="google.com">
          <div className="create-account-form-button"> Click here</div>
        </a>{" "}
      </div>
    </div>
  );
}

export default SignInFooter;
