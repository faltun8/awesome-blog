import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Copyright from "../components/Copyright";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const postValidationSchema = Yup.object().shape({
  title: Yup.string().max("30").required("Title is required!!!"),
  content: Yup.string().required("Content is required"),
  image: Yup.string().required("Please enter website"),

});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    width: "25%",
    margin: "auto",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function PostCreate() {
  const [value, setValue] = React.useState("p");
  const classes = useStyles();
  const history = useHistory();
  const token = localStorage.getItem("token");
  async function create({ title, content, image, status }) {
    console.log("create ici status", status);
    console.log("create ici status", content);
    console.log("create ici status", image);
    console.log("create ici status", title);
    
    await axios
      .post(
        "https://blog-backend-django.herokuapp.com/api/create/",
        {
          title:title,
          content:content,
          image:image,
          status:status,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((data) => {
        console.log("new data",data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    handleChange()
    
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      image: "",
      status: "p",
    },
    validationSchema: postValidationSchema,
    onSubmit: (values) => {
     
      const handleChange = (event, newValue) => {
        setValue(newValue);
        
        
      };handleChange()
      console.log(values);
      create(values);
    },
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  formik.values.status = newValue;
  console.log("onchange ici",formik.values.status)
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalMallIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Post
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title "
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.errors.title}
              helperText={formik.errors.title}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              id="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.errors.content}
              helperText={formik.errors.content}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image URL"
              id="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.errors.image}
              helperText={formik.errors.image}
            />

            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              required
              // variant="standard"
              // margin="normal"
              // name="status"
              // id="status"
            >
              <Tab label="Publish" value="p" />
              <Tab label="Draft" value="d" />
            </Tabs>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Share Post
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
