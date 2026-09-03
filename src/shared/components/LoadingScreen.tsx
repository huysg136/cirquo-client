import { Flex, Spin } from "antd";

interface LoadingScreenProps {
  fullScreen?: boolean;
}

export function LoadingScreen({ fullScreen = false }: LoadingScreenProps) {
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
