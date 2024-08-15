import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import useAuth from "../helpers/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState("");
  const { authState } = useAuth();

  const fetchPostsData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/posts/byUserId/${id}`
      );
      console.log(data);
      setListOfPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/auth/basicinfo/${id}`
      );
      setUsername(data.username);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
    fetchPostsData();
  }, []);
  if (!listOfPosts) return <div>loading...</div>;
  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <p>
          Welcome on <strong> {username} </strong> profile
        </p>
        {username === authState.username ? (
          <Button
            sx={{ display: "flex" }}
            onClick={() => {
              navigate("/changePassword");
            }}
          >
            Change Password
          </Button>
        ) : null}
      </div>
      {listOfPosts.length === 0 ? (
        <h1>
          {" "}
          <strong>No content related to user</strong>
        </h1>
      ) : null}
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
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                  gap: "0.2rem",
                }}
              >
                <span>{list.Likes.length} </span>

                <FavoriteIcon color="primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
