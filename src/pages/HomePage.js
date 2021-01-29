import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Footer from "../components/Footer";
import axios from "axios";
import MediaCard from "../components/MediaCard";
//import fetchData from "../helper/FetchData";

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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function HomePage() {
  const classes = useStyles();
  const [mainPageData, setMainPageData] = useState();

  const fetchData = async () => {
    const response = await axios.get(
      "https://blog-backend-django.herokuapp.com/api/list/"
    );
    return response;
  };

  useEffect(() => {
    fetchData().then((res) => setMainPageData(res.data.results));
  }, []);
  console.log("mainPageData", mainPageData);

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {mainPageData?.map((post) => (
              <MediaCard
                key={post}
                postImg={post.image}
                title={post.title}
                content={post.content}
                publishDate={post.published_date}
                author={post.author}
                likeCount={post.get_like_count}
                viewCount={post.get_view_count}
                commentCount={post.get_comment_count}
              />
              //<MediaCard key={card} postImg={}, title, content, email,  />
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
}
