import { Image } from "antd";

import cirquoLogo from "../../../images/cirquo-logo.png";

export function AuthBrand() {
  return <Image preview={false} width={140} src={cirquoLogo} alt="Cirquo" />;
}
