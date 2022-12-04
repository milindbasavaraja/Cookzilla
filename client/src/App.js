import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/UI/Navbar";
import MyProfile from "./components/MyProfile";

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/write",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/log-in",
    element: <Login />,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
  },
]);
function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
