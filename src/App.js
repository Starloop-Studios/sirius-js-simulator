import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Barracks from "./pages/BarracksPage";
import { Route, Routes, Navigate } from "react-router-dom";
// import { Toast } from "react-toastify/dist/components";
import Toast from "./components/UI/Toast";
import FooterPage from "./pages/FooterPage";
import Navbar from "./components/Navbar/Navbar";
import UserPage from "./pages/UserPage";
function App() {
  const authCtx = useContext(AuthContext);

  // const dataCtx = useContext(DataContext);
  // useEffect(() => {
  //   dataCtx.setInitialData(data);
  // }, []);

  return (
    <div className="App">
      
      {authCtx.isLoggedin && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authCtx.isLoggedin ? <Dashboard /> : <Auth />}
          exact
        />
        <Route
          path="/user"
          element={
            authCtx.isLoggedin ? <UserPage /> : <Navigate replace to="/" />
          }
          exact
        ></Route>
        <Route
          path="/building"
          element={
            authCtx.isLoggedin ? <Dashboard /> : <Navigate replace to="/" />
          }
          exact
        ></Route>
        <Route
          path="/barracks/:id"
          element={
            authCtx.isLoggedin ? <Barracks /> : <Navigate replace to="/" />
          }
          exact
        ></Route>
      </Routes>
      {authCtx.isLoggedin && <FooterPage />}
      {/* <Toast /> */}
      {/* {!authCtx.isLoggedin && <Auth />}
      {authCtx.isLoggedin && <Dashboard />} */}
      {/* <Barracks />
      {/* <User/> */}
    </div>
  );
}

export default App;
