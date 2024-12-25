import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Outlet />
    </MantineProvider>
  );
}
