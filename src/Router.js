import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
import Services, {
  loader as serviceCountLoader,
} from "./components/Services/Services";
import Service, { loader as serviceLoader } from "./components/Service/Service";
import { reviewAddAction } from "./actions/review-add";
import AddAService from "./components/AddAService/AddAService";
import MyReviews from "./components/MyReviews/MyReviews";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import PrivateRouteProtector from "./components/PrivateRouteProtector/PrivateRouteProtector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        loader: serviceCountLoader,
        element: <Services />,
      },
      {
        path: "/service/:id",
        loader: serviceLoader,
        action: reviewAddAction,
        element: <Service />,
      },
      {
        path: "/service/add",
        element: (
          <PrivateRouteProtector>
            <AddAService />
          </PrivateRouteProtector>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRouteProtector>
            <MyReviews />
          </PrivateRouteProtector>
        ),
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
