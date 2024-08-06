import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";

import "./index.css";
import { Login } from "./pages/Login";
import Sigin from "./pages/Sigin";
function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sigin" element={<Sigin />} />
      </Routes>
    </div>
  );
}

export default App;
