import { Flex, Spin } from "antd";

export function LoadingScreen({ fullScreen = false }) {
  return (
    <Flex
      align="center"
      justify="center"
      className={fullScreen ? "min-h-dvh bg-slate-100" : "min-h-48 bg-slate-100"}
    >
      <Spin size="large" description="Loading" />
    </Flex>
  );
}
