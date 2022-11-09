import { useContext } from "react";
import DataContext from "../../store/data-context";
import { NavLink } from "react-router-dom";
import Styles from "./Navbar.module.css";
const NavbarCmp = () => {
  let activeStyle = {
    fontWeight: "bolder",
  };
  const dataCtx = useContext(DataContext);
  console.log(dataCtx.barrackId);
  return (
    <div className={Styles.container}>
      <div className={Styles.logo} href="/">
        <li>
          <NavLink to="/" exact="true">
            Zoolana Simulator
          </NavLink>
        </li>
      </div>
      <div className={Styles.nav}>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/user"
            exact="true"
          >
            User
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/building"
            exact="true"
          >
            Buildings
          </NavLink>
        </li>
        {dataCtx.barrackId && (
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to={`/barracks/${dataCtx.barrackId}`}
              exact="true"
            >
              Barracks
            </NavLink>
          </li>
        )}
      </div>
    </div>
  );
};

export default NavbarCmp;
