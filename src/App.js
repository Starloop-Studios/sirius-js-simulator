import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./components/Home/Home";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      {!authCtx.isLoggedin && <Auth />}
      {authCtx.isLoggedin && <Dashboard />}
      {/* <Home/> */}
    </div>
  );
}

export default App;
