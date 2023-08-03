import { Flex, Text, useTheme } from "@aws-amplify/ui-react";
import "../../styles/signin/signin.css";

function Footer() {
  const { tokens } = useTheme();

  return (
    <div
      justifyContent="center"
      className="background-footer"
      padding={tokens.space.medium}
    >
      <div className="background-footer">&copy; All Rights Reserved</div>
    </div>
  );
}

export default Footer;
