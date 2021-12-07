import { FunctionComponent } from "react";

import "./UserIcon.component.scss"

const UserIcon: FunctionComponent<{}> = (props) => {
  const userImage = localStorage.getItem("userImage");
  const userColor = localStorage.getItem("userColor");

  const styl: any = {};

  if (userImage) styl["backgroundImage"] = `url(${userImage})`;
  if (userColor) styl["borderColor"] = userColor;

  return styl ? <div className="UserIcon" style={styl} /> : <div className="UserIcon" />;
};

export default UserIcon;
