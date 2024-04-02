import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import DynamicBlog from "../pages/DynamicBlog/DynamicBlog";
import Authors from "../pages/Authors/Authors";
import DynamicAuthor from "../pages/DynamicAuthor/DynamicAuthor";
import AddBlog from "../pages/AddBlog/AddBlog";
import EditBlog from "../pages/EditBlog/EditBlog";

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
        path: "/blog/:id",
        element: <DynamicBlog />,
      },
      {
        path: "/authors",
        element: <Authors />,
      },

      {
        path: "/author/:id",
        element: <DynamicAuthor />,
      },
      { path: "/new-blog", element: <AddBlog /> },
      {
        path: "/edit-blog/:id",
        element: <EditBlog />,
      },
    ],
  },
]);

export default router;
