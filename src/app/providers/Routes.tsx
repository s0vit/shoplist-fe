import { RouterProvider } from "react-router-dom";
import { Router } from "src/pages/routes.tsx";

export const Routes = () => {
  return <RouterProvider router={Router} />;
};

export default Routes;
