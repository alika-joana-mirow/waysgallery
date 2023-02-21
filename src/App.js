import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Offer from "./components/Offer";
import Order from "./components/Order";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

// component
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import DetailUser from "./pages/DetailUser";
import EditProfile from "./pages/EditProfile";
import Hired from "./pages/Hired";
import PrivateRoot from "./pages/PrivateRoot";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import SendProject from "./pages/SendProject";
import Transaction from "./pages/Transaction";
import UploadPost from "./pages/UploadPost";

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    if (state.isLogin === false) {
      navigate("/auth");
    } else {
      navigate("/home");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<Landing />} />

      <Route element={<PrivateRoot />}>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/detail" element={<Detail />} />
        <Route exact path="/upload-post" element={<UploadPost />} />
        <Route exact path="/edit-profile/:id" element={<EditProfile />} />
        <Route exact path="/detail-user/:id" element={<DetailUser />} />
        <Route exact path="/transaction/:id" element={<Transaction />}>
          <Route path="order" element={<Order />} />
          <Route path="offer/" element={<Offer />} />
      </Route>
        <Route exact path="/hired/:id" element={<Hired />} />
        <Route exact path="/send-project/:id" element={<SendProject />} />
        <Route exact path="/project/:id" element={<Project />} />
      </Route>
    </Routes>
  );
}

export default App;
