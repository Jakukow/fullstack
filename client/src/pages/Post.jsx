import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();

  useEffect(() => {
    FetchData();
  }, []);

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
            <Typography> {postDetails.title}</Typography>

            <Typography> {postDetails.postText}</Typography>
            <Typography> {postDetails.username}</Typography>
          </CardContent>
        </Card>
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="outlined"
        >
          Home Page
        </Button>
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
                    <Typography> {comment.commentBody}</Typography>
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
