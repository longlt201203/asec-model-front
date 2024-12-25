import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../pages/Dashboard";
import DashboardHomePage from "../pages/Dashboard/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <DashboardHomePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
