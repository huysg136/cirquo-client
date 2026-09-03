import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useAuthInit } from "../features/auth/hooks/useAuthInit";
import { APP_THEME } from "../shared/config/theme";
import { AppRouter } from "./router/AppRouter";

function App() {
  useAuthInit();

  return (
    <ConfigProvider theme={{ token: APP_THEME.antdToken }}>
      <ToastContainer position="top-right" autoClose={2000} toastClassName="small-toast" />
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
