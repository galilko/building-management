import { store } from "../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { reportsApiSlice } from "../reports/reportsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      reportsApiSlice.util.prefetch("getReports", "reportsList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
