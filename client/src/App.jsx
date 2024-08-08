import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

import "./index.css";
import { Login } from "./pages/Login";
import Sigin from "./pages/Sigin";
import { AuthProvider } from "./helpers/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sigin" element={<Sigin />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
