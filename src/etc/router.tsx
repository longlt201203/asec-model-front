import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../pages/Dashboard";
import DashboardHomePage from "../pages/Dashboard/Home";
import DashboardEnvironmentsPage from "../pages/Dashboard/Environments";
import DashboardFactorsPage from "../pages/Dashboard/Factors";
import DashboardSpeciesPage from "../pages/Dashboard/Species";
import DashboardAttributesPage from "../pages/Dashboard/Attributes";
import DashboardEnvironmentDetailPage from "../pages/Dashboard/Environments/Detail";

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
          {
            path: "environments",
            element: <DashboardEnvironmentsPage />,
          },
          {
            path: "environments/:id",
            element: <DashboardEnvironmentDetailPage />,
          },
          {
            path: "factors",
            element: <DashboardFactorsPage />,
          },
          {
            path: "species",
            element: <DashboardSpeciesPage />,
          },
          {
            path: "attributes",
            element: <DashboardAttributesPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
