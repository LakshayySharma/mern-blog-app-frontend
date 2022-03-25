import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import CreatePostPage from "./Pages/CreatePostPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { loadUser } from "./actions/user";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "./actions/auth";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PostPage from "./Pages/PostPage";
import ProfilePage from "./Pages/ProfilePage";
import EditorComponent from "./util/EditorComponent";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(loadUser(token));
    if (!localStorage.getItem("token")) {
      dispatch(logout());
    }
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark justify-content-start">
        <NavLink className="navbar-brand text-light ml-3" to="/">
          BlogApp
        </NavLink>
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ">
              <NavLink className="nav-link text-light" to="/">
                Home
              </NavLink>
            </li>
            {user.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/me">
                    <span className="bg-primary p-2"> {user.name} </span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link text-light"
                    to="/"
                    onClick={handleLogout}
                  >
                    Log out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/login">
                    Log in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/sign-up">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/posts/:id"
          element={<PrivateRoute component={PostPage} />}
        />
        <Route path="/me" element={<PrivateRoute component={ProfilePage} />} />
        <Route
          path="/add-post"
          element={<PrivateRoute component={CreatePostPage} />}
        />
        <Route path="/editor" component={EditorComponent} />
      </Routes>
    </div>
  );
}

export default App;
