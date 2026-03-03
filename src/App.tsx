import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { antdConfig } from "./theme/antdConfig";
import router from "./router";

const App = () => {
  return (
    <ConfigProvider theme={antdConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
