import { Image, useTheme } from "@aws-amplify/ui-react";

export function Logo() {
  const { tokens } = useTheme();

  return (
    <div className="signin-header-logo">
      <div className="signin-logo"> Divot </div>
      <div className="signin-beta">
        Beta
        <div className="signin-info-logo">ⓘ</div>
      </div>
    </div>
  );
}

export default Logo;
