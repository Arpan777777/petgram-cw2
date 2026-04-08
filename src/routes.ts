import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import PetProfile from "./pages/PetProfile";
import MyPets from "./pages/MyPets";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "pet/:id", Component: PetProfile },
      { path: "my-pets", Component: MyPets },
      { path: "upload", Component: Upload },
      { path: "search", Component: Search },
      { path: "profile", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
]);