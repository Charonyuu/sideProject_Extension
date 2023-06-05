import { Outlet } from "react-router-dom";
import Menu from "@/component/menu";
import AppNav from "@/apps/AppNav";

// app
import ETFApp from "@/apps/ETF_app";
import PTTApp from "@/apps/PTT_app";
import PTTBoradList from "@/apps/PTT_app/component/PTTBoardList";

const appRoutes = {
  path: "/app/",
  element: (
    <AppNav>
      <Outlet />
    </AppNav>
  ),
  children: [
    { path: "ETF", element: <ETFApp /> },
    {
      path: "PTT/",
      element: <PTTApp />,
    },
    {
      path: "PTT/board",
      element: <PTTBoradList />,
    },
  ],
};

export { Menu, appRoutes };
