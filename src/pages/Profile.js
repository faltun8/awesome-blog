import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Footer from "../components/Footer";
import axios from "axios";
import MediaCard from "../components/MediaCard";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  menuButton: {
    float: "right",
    marginRight: theme.spacing(1),
    boxShadow: "1px 10px 50px 1px rgba(0,0,0,0.5)",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "10px 10px 50px 1px rgba(0,0,0,0.9)",
      backgroundColor: "white",
      color: "#FF0102",
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [profilePage, setProfilePage] = useState();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const response = await axios.get(
      "https://blog-backend-django.herokuapp.com/api/postlist/",
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
    return response;
  };

  useEffect(() => {
    fetchData().then((res) => setProfilePage(res.data.results));
  }, []);

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {profilePage?.map((post) => (
              <Grid item sm={4} xs={12} key={post.slug}>
                <MediaCard
                  postImg={post.image}
                  title={post.title}
                  content={post.content}
                  publishDate={post.published_date}
                  author={post.author}
                  likeCount={post.get_like_count}
                  viewCount={post.get_view_count}
                  commentCount={post.get_comment_count}
                  slug={post.slug}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        href="/post-create"
      >
        <AddIcon />
      </IconButton>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
