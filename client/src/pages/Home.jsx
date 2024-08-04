import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();
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
  }, []);

  if (!listOfPosts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <header>
        <Button onClick={() => navigate("/createpost")}>Create new post</Button>
      </header>
      <div>
        {listOfPosts.map((list, index) => {
          return (
            <div
              className="card"
              key={index}
              onClick={() => navigate(`/post/${list.id}`)}
            >
              <div>{list.title}</div>
              <div>{list.postText}</div>
              <div>{list.username}</div>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
