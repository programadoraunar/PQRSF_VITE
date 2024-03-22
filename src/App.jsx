import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFount from "./pages/NotFount";
import { AuthProvider } from "./context/AuthContext";
import AdminProfile from "./pages/admin/AdminProfile";
import LayoutAdmin from "./layouts/LayoutAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/AdminProfile" element={<LayoutAdmin/>}>
            <Route index element={<HomeAdmin />}></Route>
          </Route>
          <Route path="*" element={<NotFount />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
