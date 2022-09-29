import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      {!authCtx.isLoggedin && <Auth />}
      {authCtx.isLoggedin && <Home />}
    </div>
  );
}

export default App;
