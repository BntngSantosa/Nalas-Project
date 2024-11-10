import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Sejarah from "./components/pages/Sejarah.jsx";
import Tentang from "./components/pages/Tentang.jsx";
import Masuk from "./components/pages/Masuk.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Daftar from "./components/pages/Daftar.jsx";
import TambahWb from "./components/pages/TambahWb.jsx";
import TambahEven from "./components/pages/TambahEvent.jsx";
import WarisanBudaya from "./components/pages/WarisanBudaya.jsx";
import DetailWb from "./components/pages/DetailWb.jsx";
import Event from "./components/pages/Event.jsx";
import DetailEvent from "./components/pages/DetailEvent.jsx";
import NavbarLayout from "./components/layouts/NavbarLayout.jsx";
import Dashboard from "./components/pages/admin/Dashboard.jsx";
import Admin from "./components/pages/admin/Admin.jsx";
import Users from "./components/pages/admin/User.jsx";
import UpdateUser from "./components/pages/admin/UpdateUser.jsx";
import WbData from "./components/pages/admin/WbData.jsx"
import UpdateWb from "./components/pages/admin/UpdateWb.jsx";
import TambahUser from "./components/pages/admin/TambahUser.jsx";
import TambahWbAdmin from "./components/pages/admin/TambahWb.jsx";
import EventData from "./components/pages/admin/EventData.jsx"
import UpdateEvent from "./components/pages/admin/UpdateEvent.jsx"
import TambahEventAdmin from "./components/pages/admin/TambahEventAdmin.jsx";

const router = createBrowserRouter([
  {
    element: <NavbarLayout />, // Main layout for regular users
    children: [
      { path: "/", element: <Home /> },
      { path: "/sejarah-kab-bandung", element: <Sejarah /> },
      { path: "/tentang-pemkab", element: <Tentang /> },
      { path: "/masuk", element: <Masuk /> },
      { path: "/daftar", element: <Daftar /> },
      { path: "/tambah-wb", element: <TambahWb /> },
      { path: "/tambah-event", element: <TambahEven /> },
      { path: "/warisan-budaya", element: <WarisanBudaya /> },
      { path: "/detail-wb/wb/:id", element: <DetailWb /> },
      { path: "/event", element: <Event /> },
      { path: "/detail-event/event/:id", element: <DetailEvent /> },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <Admin />,
    children: [
      { path: "/admin/dashboard", element: <Dashboard /> },
      { path: "/admin/dashboard/user", element: <Users /> },
      { path: "/admin/dashboard/user/update/:id", element: <UpdateUser /> },
      { path: "/admin/dashboard/user/tambah/", element: <TambahUser/> },
      { path: "/admin/dashboard/wb", element: <WbData /> },
      { path: "/admin/dashboard/wb/update/:id", element: <UpdateWb /> },
      { path: "/admin/dashboard/wb/tambah", element: <TambahWbAdmin/> },
      { path: "/admin/dashboard/event", element: <EventData/> },
      { path: "/admin/dashboard/eventWB/update/:id", element: <UpdateEvent/> },
      { path: "/admin/dashboard/eventWB/tambah", element: <TambahEventAdmin/> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
