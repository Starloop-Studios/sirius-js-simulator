import "./App.css";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";
import DataContext from "./store/data-context";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Barracks from "./pages/BarracksPage";
// import { data } from "./data/intialData";
function App() {
  const authCtx = useContext(AuthContext);

  // const dataCtx = useContext(DataContext);
  // useEffect(() => {
  //   dataCtx.setInitialData(data);
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={authCtx.isLoggedin ? <Dashboard /> : <Auth />}
          exact
        />
        <Route
          path="/barracks"
          element={authCtx.isLoggedin ? <Barracks /> : <Auth />}
          exact
        ></Route>
      </Routes>
      {/* {!authCtx.isLoggedin && <Auth />}
      {authCtx.isLoggedin && <Dashboard />} */}
      {/* <Barracks /> */}
    </div>
  );
}

export default App;
