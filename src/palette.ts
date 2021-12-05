import { PaletteMode } from "@mui/material";

export const colorPalette = {
  background: "background",
  tile: {
    background: "tile.background",
    border: "tile.border",
  },
  button: {
    primary: "button.primary",
  },
  text: {
    primary: "text.primary",
  },
};

export default function getPalette(mode: PaletteMode) {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            background: "#0A1929",
            tile: {
              background: "#001E3C",
              border: "#1E4976",
            },
            button: {
              primary: "#0074EA",
            },
            text: {
              primary: "#FFFFFF",
            },
          }
        : {
            // palette values for light mode
            background: "#F6FAFE",
            tile: {
              background: "#DAECFB",
              border: "#7EBBF1",
            },
            button: {
              primary: "#7EBBF1",
            },
            text: {
              primary: "#0C1E31",
            },
          }),
    },
  };
}
