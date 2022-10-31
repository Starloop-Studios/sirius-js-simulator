import "./App.css";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
// import { Toast } from "react-toastify/dist/components";
import Toast from './components/UI/Toast'
function App() {
  const authCtx = useContext(AuthContext);

  // const dataCtx = useContext(DataContext);
  // useEffect(() => {
  //   dataCtx.setInitialData(data);
  // }, []);

  return (
    <div className="App">
      {/* <Routes>
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
      </Routes> */}
      {/* <Toast /> */}
      {/* {!authCtx.isLoggedin && <Auth />}
      {authCtx.isLoggedin && <Dashboard />} */}
      {/* <Barracks />
      {/* <User/> */}
    </div>
  );
}

export default App;
