import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/pages/HomePage.js";
import Registration from "./components/pages/Registration";
import Login from "./components/pages/login.js";
import { useAuth } from "./context/auth";
import toast from "react-hot-toast";
import Task from "./components/pages/Task.js";
import AllTask from "./components/pages/All-task.js";
import UpdateTask from "./components/pages/updateTask.js";
function App() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Succesfully");
  };
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg bg-primary ">
          <div className="container-fluid">
            <a className="navbar-brand ">CRUD APP</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
              <div className="navbar-nav ">
                {!auth?.user ? (
                  <>
                    <Link to="/login" className="nav-link text-light" href="#">
                      LOGIN
                    </Link>
                    <Link
                      to="/register"
                      className="nav-link text-light"
                      href="#"
                    >
                      REGISTER
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/create-task"
                      className="nav-link active text-light"
                      aria-current="page"
                    >
                      Create Task
                    </Link>

                    <Link
                      to="/all-task"
                      className="nav-link text-light"
                      href="#"
                    >
                      ALL Task
                    </Link>

                    <Link
                      to="/login"
                      className="nav-link text-light"
                      href="#"
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-task" element={<Task />} />
          <Route path="/all-task" element={<AllTask />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
