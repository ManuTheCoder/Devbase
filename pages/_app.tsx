import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

export default function App({ Component, pageProps }: any): any {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none"
          }
        }
      }
    },
    palette: { mode: "dark" }
  });
  return (
    <>
      <Head>
        <title>Devbase &bull; Dashboard</title>
        <link
          rel="shortcut icon"
          href="https://i.ibb.co/PD977NJ/download.png"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
