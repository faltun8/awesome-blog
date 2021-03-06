import React from 'react'
import Typography from "@material-ui/core/Typography";
import Copyright from '../components/Copyright'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
   
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    )
}

export default Footer
