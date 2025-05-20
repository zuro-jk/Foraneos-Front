import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./shared/theme-provider/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ThemeProvider
    defaultTheme="dark"
    storageKey="vite-ui-theme"
  >
    {/* <HotkeysProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </HotkeysProvider> */}
  </ThemeProvider>
  //</React.StrictMode>
);
