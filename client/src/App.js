import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Posts/Home";
import Post from "./components/Posts/Post";
import CreatePost from "./components/Posts/CreatePost";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/UI/Navbar";
import MyProfile from "./components/Posts/MyProfile";
import Groups from "./components/groups/Groups";
import GroupDetails from "./components/groups/GroupDetails";

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
      {
        path: "/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path: "/groups/:name",
        element: <GroupDetails />,
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
