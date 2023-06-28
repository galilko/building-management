import logo from "./logo.svg";
import "./App.css";
import DashLayout from "./components/DashLayout";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import UsersList from "./features/users/UsersList";
import Welcome from "./components/Welcome";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import AddUserForm from "./features/users/AddUserForm";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashLayout />}>
          {/*public routes*/}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/*protected routes*/}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route path="dash">
                  <Route index element={<Welcome />} />
                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Admin, ROLES.Manager]}
                      />
                    }
                  >
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path="new" element={<AddUserForm />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          {/*end protected routes*/}
        </Route>
      </Routes>
    </>
  );
}

export default App;

/*
<Routes>
<Route path="/" element={<Layout />}>
  <Route index element={<Public />} />
  <Route path="login" element={<Login />} />
  <Route path="dash" element={<DashLayout />}>
    <Route index element={<Welcome />} />
    <Route path="users">
      <Route index element={<UsersList />} />
      <Route path=":id" element={<EditUser />} />
      <Route path="new" element={<NewUserForm />} />
    </Route>
    <Route path="notes">
      <Route index element={<NotesList />} />
      <Route path=":id" element={<EditNote />} />
      <Route path="new" element={<NewNote />} />
    </Route>
  </Route>
</Route>
</Routes>
*/
