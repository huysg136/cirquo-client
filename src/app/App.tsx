import { App as AntdApp, ConfigProvider } from "antd";

import { useAuthInit } from "../features/auth/hooks/useAuthInit";
import { APP_THEME } from "../shared/config/theme";
import { AppRouter } from "./router/AppRouter";

function App() {
  useAuthInit();

  return (
    <ConfigProvider theme={{ token: APP_THEME.antdToken }}>
      <AntdApp message={{ duration: 2, maxCount: 3 }}>
        <AppRouter />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
