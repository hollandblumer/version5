import { useTheme } from "@aws-amplify/ui-react";
import TidioWrapper from "../../TidioWrapper";

export function Logo() {
  const { tokens } = useTheme();

  return (
    <div className="signin-header-logo">
      <div className="signin-logo"> Divot </div>
      <div className="signin-beta">
        Beta
        <TidioWrapper/>
      </div>
    </div>
  );
}

export default Logo;
