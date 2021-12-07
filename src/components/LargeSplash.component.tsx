import Box from "@mui/system/Box";
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router";

interface LargeSplashProps {
  imagePath?: string;
  borderColor?: string;
}

const LargeSplash: FunctionComponent<LargeSplashProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        borderWidth: "4px",
        borderStyle: "solid",
        borderColor: props.borderColor ?? "text.primary",
        width: "260px",
        height: "260px",
        borderRadius: "50%",
        cursor: "pointer",
        backgroundImage: props.imagePath ? `url(${props.imagePath})` : undefined,
        backgroundSize: props.imagePath ? "cover" : undefined,
        backgroundRepeat: props.imagePath ? "no-repeat" : undefined,
        backgroundPosition: props.imagePath ? "center" : undefined,
      }}
    >
      {props.imagePath ? (
        <div style={{width: "100%", height: "100%"}} onClick={() => {navigate("/dashboard")}} />
      ) : (
        <>
          <Box
            sx={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: props.borderColor ?? "text.primary",
              height: "60%",
              width: 0,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Box
            sx={{
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: props.borderColor ?? "text.primary",
              height: 0,
              width: "60%",
              left: "50%",
              top: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          />
        </>
      )}
    </Box>
  );
};

export default LargeSplash;
