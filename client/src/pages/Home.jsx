import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../helpers/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const { setAuthState, authState, checkAuth } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };
  const FetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/posts");
      setListOfPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
    checkAuth();
  }, []);

  if (!listOfPosts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <nav
        style={{
          display: "flex",
          padding: "1rem",
          justifyContent: "space-around",
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
        }}
      >
        <Button onClick={() => navigate("/createpost")}>Create new post</Button>
        {authState.status ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p>Hello {authState.username}! </p>
            <IconButton aria-label="logout" color="primary" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </div>
        ) : (
          <div>
            <Button onClick={() => navigate("/login")}>Log In</Button>
            <Button onClick={() => navigate("/sigin")}>Sign Up</Button>
          </div>
        )}
      </nav>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {listOfPosts.map((list, index) => {
          return (
            <div
              className="card"
              key={index}
              onClick={() => navigate(`/post/${list.id}`)}
            >
              <div style={{ width: "100%" }}>
                <strong>{list.title}</strong>
                <hr />
              </div>
              <div>{list.postText}</div>
              <div
                style={{
                  alignSelf: "flex-end",
                  justifySelf: "flex-end",
                  fontSize: "0.8rem",
                }}
              >
                <p>@{list.username}</p>
              </div>
              <br />
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
