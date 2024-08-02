import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

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
  } else {
    return (
      <div>
        {listOfPosts.map((list, index) => {
          return (
            <div key={index}>
              <div>{list.title}</div>
              <div>{list.postText}</div>
              <div>{list.username}</div>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
