import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import DynamicBlog from "../pages/DynamicBlog/DynamicBlog";
import Authors from "../pages/Authors/Authors";
import DynamicAuthor from "../pages/DynamicAuthor/DynamicAuthor";
import AddBlog from "../pages/AddBlog/AddBlog";
import EditBlog from "../pages/EditBlog/EditBlog";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/Cart/Cart";
import Order from "../pages/Order/Order";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import UserOrders from "../pages/User Related/UserOrders/UserOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "blog/:id",
        element: (
          <PrivateRoute>
            <DynamicBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "authors",
        element: <Authors />,
      },

      {
        path: "author/:id",
        element: <DynamicAuthor />,
      },
      {
        path: "new-blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-blog/:id",
        element: (
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "order-success",
        element: (
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "user-order",
        element: (
          <PrivateRoute>
            <UserOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
