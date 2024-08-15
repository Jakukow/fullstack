import {
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../helpers/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";

const Post = () => {
  const { id } = useParams();
  const { authState, checkAuth } = useAuth();

  useEffect(() => {
    FetchData();
    checkAuth();
  }, []);

  const editPost = async (option) => {
    if (option === "postText") {
      let newPostText = prompt("Enter New Text:");
      axios.put(
        `http://localhost:3001/posts/${option}`,
        {
          newText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setPostDetails({ ...postDetails, postText: newPostText });
    } else {
      let newTitle = prompt("Enter New Title:");
      axios.put(
        `http://localhost:3001/posts/${option}`,
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      setPostDetails({ ...postDetails, title: newTitle });
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (id, key) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/comments/${id}`,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
      console.log(data);
      const updatedComments = postComments.toSpliced(key, 1);
      setPostComments([...updatedComments]);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/comments/",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      if (data.error) return alert(data.error);
      setNewComment("");
      console.log(data);
      setPostComments([...postComments, data]);
    } catch (error) {
      console.log(error);
    }
  };
  const [postDetails, setPostDetails] = useState("");
  const [postComments, setPostComments] = useState("");
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const FetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/posts/byId/${id}`
      );

      const { data: comments } = await axios.get(
        `http://localhost:3001/comments/${id}`
      );
      if (data) {
        setPostDetails(data);
      }
      if (comments) {
        setPostComments(comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "50%",
          padding: "2rem",
        }}
      >
        <Card
          sx={{
            width: "100%",
            textAlign: "center",
            height: "70vh",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,  rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              onClick={() => {
                if (postDetails.username === authState.username)
                  editPost("title");
              }}
            >
              {" "}
              {postDetails.title}
            </Typography>

            <Typography
              onClick={() => {
                if (postDetails.username === authState.username)
                  editPost("postText");
              }}
            >
              {" "}
              {postDetails.postText}
            </Typography>
            <Typography> {postDetails.username}</Typography>
          </CardContent>
        </Card>

        <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
          <Button
            sx={{ width: "50%" }}
            onClick={() => {
              navigate("/");
            }}
            variant="outlined"
          >
            Home Page
          </Button>
          {postDetails.username === authState.username && (
            <Button
              sx={{ width: "50%" }}
              onClick={() => {
                deletePost(postDetails.id);
              }}
              variant="outlined"
              color="error"
            >
              Delete post
            </Button>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <TextField
            type="text"
            placeholder="Put your comment down"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <Button variant="outlined" onClick={addComment} size="large">
            Add Comment
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {postComments.length !== 0 ? (
            postComments.map((comment, key) => {
              return (
                <Card key={key}>
                  <CardContent>
                    <Typography>
                      {comment.commentBody}{" "}
                      {authState.username === comment.username && (
                        <IconButton
                          onClick={() => deleteComment(comment.id, key)}
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "small",
                        textAlign: "end",
                        marginTop: "0.2rem",
                      }}
                    >
                      {" "}
                      @ {comment.username}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p> No comments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
