import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState("");

  const fetchPostsData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/posts/byUserId/${id}`
      );
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
  return <div>Profile: {username}</div>;
};

export default Profile;
