import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();

  useEffect(() => {
    FetchData();
  }, []);

  const addComment = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/comments/", {
        commentBody: newComment,
        PostId: id,
      });
      console.log(data);
      setNewComment("");
      setPostComments([...postComments, data]);
    } catch (error) {
      console.log(error);
    }
  };
  const [postDetails, setPostDetails] = useState("");
  const [postComments, setPostComments] = useState("");
  const [newComment, setNewComment] = useState("");
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
    <div>
      <Typography>{postDetails.title}</Typography>
      <TextField
        type="text"
        placeholder="Put your comment down"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
      <Button onClick={addComment} size="large">
        Add Comment
      </Button>
      <br />
      <div>
        {postComments ? (
          postComments.map((comment, key) => {
            return (
              <Card key={key}>
                <CardContent>
                  <Typography> {comment.commentBody}</Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p> No comments</p>
        )}
      </div>
    </div>
  );
};

export default Post;
