import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Profile = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState("");

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
      <div>
        Welcome on <strong>{username} </strong> profile
      </div>
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
