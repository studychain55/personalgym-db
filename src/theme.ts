import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B35",
      light: "#FFF3ED",
      50: "#FFF3ED",
      100: "#FFE6D9",
      200: "#FFCDB3",
      300: "#FFB48C",
      400: "#FF9B66",
      500: "#FF6B35",
      600: "#E55E2F",
      700: "#CC5229",
      800: "#B24523",
      900: "#99391D",
    },
    grey: {
      50: "#F7F7F7",
      100: "#E9E9E9",
      200: "#D3D3D3",
      300: "#BFBFBF",
      400: "#ABABAB",
      500: "#969696",
      600: "#828282",
      700: "#6E6E6E",
      800: "#595959",
      900: "#454545",
      A100: "#121212",
    },
    error: {
      main: "#C53A3B",
    },
  },
  typography: {
    fontFamily: `var(--font-noto-sans-jp), 'Noto Sans JP', sans-serif`,
    fontWeightBold: 700,
    fontWeightRegular: 400,
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        ul: {
          "& .MuiPaginationItem-root": {
            color: "rgb(36 36 36/ .6)",
            fontWeight: "bold",
            border: "1px solid #E9E9E9",
            backgroundColor: "#fff",
          },
          "& .MuiPaginationItem-previousNext": {
            backgroundColor: "#FFF3ED",
            color: "#FF6B35",
            border: "1px solid #FF6B35",
          },
          "& .MuiPaginationItem-previousNext.Mui-disabled": {
            color: "rgb(36 36 36/ .2)",
            border: "1px solid #E9E9E9",
            backgroundColor: "#fff",
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#fff",
            color: "#FF6B35",
            border: "1px solid #FF6B35",
          },
          "& .MuiPaginationItem-page:hover": {
            backgroundColor: "#FF6B35",
            color: "#fff",
          },
        },
      },
    },
  },
});

export default theme;
