import React from "react";

import { Box, Button, useTheme } from "@mui/material";

import ColorModeContext from "../context/colorMode.context";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 2
      }}
    >
      <Box>
        Motyw:
        <Button sx={{marginLeft: 1}} variant="contained" onClick={colorMode.toggleColorMode}>{theme.palette.mode === "dark" ? "Ciemny" : "Jasny"}</Button>
      </Box>
    </Box>
  );
}
