import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GoogleAnalytics } from "@next/third-parties/google";
import theme from "@/theme";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Component {...pageProps} />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </div>
    </ThemeProvider>
  );
}
