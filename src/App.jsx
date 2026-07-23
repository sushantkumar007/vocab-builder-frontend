import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./services/auth.service.js";
import { login, logout } from "./store/userSlice.js";
import PageLoader from "./components/PageLoader.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then((session) => {
        if (session) {
          dispatch(login(session?.data.user));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return <>{loading ? <PageLoader /> : <Outlet />}</>;
}

export default App;
