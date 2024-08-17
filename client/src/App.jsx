import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

import "./index.css";
import { Login } from "./pages/Login";
import Sigin from "./pages/Sigin";
import { AuthProvider } from "./helpers/AuthContext";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Layout from "./helpers/Layout";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sigin" element={<Sigin />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
