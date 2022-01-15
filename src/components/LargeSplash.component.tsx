import { FunctionComponent } from "react";
import { useNavigate } from "react-router";

import "./LargeSplash.component.scss"

interface LargeSplashProps {
  borderColor?: string;
  user?: {
    name: string;
    imagePath: string;
  };
}

const LargeSplash: FunctionComponent<LargeSplashProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className="LargeSplash"
      style={{
        borderColor: props.borderColor ?? "text.primary",
        backgroundImage: props.user ? `url(${props.user!.imagePath})` : undefined,
        backgroundSize: props.user ? "cover" : undefined,
        backgroundRepeat: props.user ? "no-repeat" : undefined,
        backgroundPosition: props.user ? "center" : undefined,
      }}
    >
      {props.user ? (
        <div
          className="LargeSplash__Set"
          onClick={() => {
            localStorage.setItem("user", props.user!.name);
            localStorage.setItem("userImage", props.user!.imagePath);
            localStorage.setItem("userColor", props.borderColor ?? "");
            navigate("/dashboard");
          }}
        />
      ) : (
        <div className="LargeSplash__Unset">
          <div 
            className="LargeSplash__Unset__Cross vertical"
            style={{borderColor: props.borderColor ?? "text.primary"}}
          />
          <div 
            className="LargeSplash__Unset__Cross horizontal"
            style={{borderColor: props.borderColor ?? "text.primary"}}
          />
        </div>
      )}
    </div>
  );
};

export default LargeSplash;
