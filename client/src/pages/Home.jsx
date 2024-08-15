import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../helpers/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { setAuthState, authState, checkAuth } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login");
  };
  const FetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      });

      setListOfPosts(data.listOfPosts);
      setLikedPosts(data.likedPosts.map((like) => like.PostId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
    checkAuth();
  }, []);

  const likeAPost = async (id) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/like",
        { PostId: id },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );

      setListOfPosts(
        listOfPosts.map((post) => {
          if (post.id === id) {
            if (data.liked) return { ...post, Likes: [...post.Likes, 0] };
            else {
              const likesArray = post.Likes;
              likesArray.pop();
              return { ...post, Likes: likesArray };
            }
          } else return post;
        })
      );
      if (likedPosts.includes(id)) {
        setLikedPosts(likedPosts.filter((ids) => ids != id));
      } else {
        setLikedPosts([...likedPosts, id]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <p>
              Hello{" "}
              <Link to={`/profile/${authState.id}`}>{authState.username}!</Link>{" "}
            </p>
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
            <div className="card" key={index}>
              <div
                onClick={() => navigate(`/post/${list.id}`)}
                style={{ width: "100%" }}
                className="title"
              >
                <strong>{list.title}</strong>

                <hr />
              </div>
              <div>{list.postText}</div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.8rem",
                }}
              >
                <Link to={`/profile/${list.UserId}`}>
                  <p>@{list.username}</p>
                </Link>
                <div style={{ style: "flex" }}>
                  <span>{list.Likes.length}</span>
                  <IconButton
                    aria-label="like"
                    color="primary"
                    onClick={() => likeAPost(list.id)}
                  >
                    {likedPosts.includes(list.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
