import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./Header";

function AppLayout() {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
