import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FaceIcon from "@material-ui/icons/Face";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { formatDateFunc } from "../helper/FormatDate";
import {useHistory} from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  count: {
    display: "flex",
    justifyContent: "space-between",
  },
  like: {
    color: "red",
    verticalAlign: 'middle'
  },
  icons: {
    verticalAlign: 'middle'
  },
  iconCount: {
    verticalAlign: 'middle',
    marginLeft: 5,
  },
  date: {
    opacity: 0.4,
    fontSize: 13,
  }
}));
export default function MediaCard({

  postImg,
  title,
  content,
  publishDate,
  author,
  likeCount,
  viewCount,
  commentCount,
  slug
}) {
  const classes = useStyles();
  const history = useHistory();

function handleSubmit() {
  history.push({pathname:"/detail-page", state:{slug}})
}



  return (
    <Grid item >
      <Card className={classes.card}>
      <CardActionArea onClick={handleSubmit}>
        <CardMedia
          className={classes.cardMedia}
          image={postImg}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{content}</Typography>
          <Typography>
            <FaceIcon className={classes.icons} />
              <span className={classes.iconCount}>{author}</span>
          </Typography>
          <Typography className={classes.date}>{formatDateFunc(publishDate)}</Typography>
          <CardContent className={classes.count}>
            <Typography>
              <FavoriteIcon className={classes.like} />
              <span className={classes.iconCount}>{likeCount}</span>
            </Typography>
            <Typography>
              <VisibilityIcon className={classes.icons}/>
              <span className={classes.iconCount}>{viewCount}</span>
            </Typography>
            <Typography>
              <ChatBubbleOutlineIcon className={classes.icons}/>
              <span className={classes.iconCount}>{commentCount}</span>
            </Typography>
          </CardContent>
        </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Button size="small" color="primary" fullWidth>
            View
          </Button>
          <Button size="small" color="primary" fullWidth>
            Edit
          </Button>
        </CardActions> */}
      </Card>
    </Grid>
  );
}












