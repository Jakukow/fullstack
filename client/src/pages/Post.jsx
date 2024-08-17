import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../helpers/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";

const schema = yup
  .object()
  .shape({
    newComment: yup.string().required("Comment is required"),
  })
  .required();

const Post = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newComment: "",
    },
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const { authState, checkAuth, setOpen, textNotify, setTextNotify } =
    useAuth();
  const [postDetails, setPostDetails] = useState("");
  const [postComments, setPostComments] = useState("");

  const [commentOpen, setCommentOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCommentOpen(false);
  };

  useEffect(() => {
    FetchData();
    checkAuth();
  }, [postComments.length]);

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
      const { data } = await axios.delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      });
      if (!data.error) {
        setTextNotify("Post has been deleted");
        setOpen(true);
        navigate("/");
      }
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

      const updatedComments = postComments.toSpliced(key, 1);
      setPostComments([...updatedComments]);
      if (!data.error) {
        setTextNotify("Comment has been deleted");
        setCommentOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async ({ newComment }) => {
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

      setPostComments([...postComments, data]);
      if (!data.error) {
        reset();
        setTextNotify("Comment has been added");
        setCommentOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              display="flex"
              bgcolor="rgb(245, 245, 245)"
              width="100%"
              justifyContent="center"
              paddingY="0.5rem"
              borderRadius="0.5rem"
              marginBottom="1rem"
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
            </Box>

            <Box
              display="flex"
              height="stretch"
              paddingY="0.5rem"
              borderRadius="0.5rem"
              width="100%"
            >
              <Typography
                onClick={() => {
                  if (postDetails.username === authState.username)
                    editPost("postText");
                }}
              >
                {" "}
                {postDetails.postText}
              </Typography>
            </Box>
            <hr />
            <Typography marginTop="1rem" textAlign="right">
              {postDetails.username}
            </Typography>
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
        <form
          onSubmit={handleSubmit(addComment)}
          style={{ display: "flex", gap: "1rem" }}
        >
          <Controller
            name="newComment"
            control={control}
            render={({ field }) => (
              <TextField
                autoComplete="false"
                label="Put your comment down"
                {...field}
                {...register("newComment")}
                error={!!errors.newComment}
                helperText={errors.newComment ? errors.newComment.message : ""}
              />
            )}
          />
          <Button variant="outlined" type="submit" size="large">
            Add Comment
          </Button>
        </form>

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
      <Snackbar
        open={commentOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {textNotify}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Post;
