// --- Material Ui Imports --- //
import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
// import React, { useState } from 'react';

export const FiCard = withStyles({
  root: {
    position: "relative",
  },
})(Card);

export const FiCardActionArea = withStyles({
  root: {
    position: "relative",
  },
})(CardActionArea);

export const FiCardActions = withStyles({
  root: {
    position: "relative",
  },
})(CardActions);

export const FiCardContent = withStyles({
  root: {
    position: "relative",
    backgroundColor: "transparent",
  },
})(CardContent);

export const FiCardMedia = withStyles({
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%",
  },
})(CardMedia);

// --- Style --- //
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  custom: {
    color: "#FDE541",
    fontWeight: "bold",
  },
  /**
   * Max Card with for demo
   * same values used in Material-Ui Card Demos
   */
  card: {
    maxWidth: 345,
  },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */
  media: {
    height: 140,
  },

  /**
   * Demo stlying to inclrease text visibility
   * May verry on implementation
   */
  fiCardContent: {
    color: "#41b551",
    backgroundColor: "rgba(0,0,0,.24)",
  },
  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)",
  },
});

function VeggiesCard(props) {
  const classes = useStyles();

  if (props.number.includes("two")) {
    return (
      <Container className={classes.container}>
        {/* Full Material-UI Image Card with action buttons  */}
        <Box my={4}>
          <Typography variant="h6" paragraph align="center">
            Make Healthy Food Choices
          </Typography>
          <FiCard className={classes.card}>
            <FiCardActionArea>
              <FiCardMedia
                media="picture"
                alt="Plate with healthy food choices"
                image="./images/healthyfoods.jpg"
                title="Healthy Plate"
              />
              <FiCardContent className={classes.fiCardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.custom}
                >
                  Healthy Plate
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.fiCardContentTextSecondary}
                  component="p"
                >
                  Healthy eating choices can have positive effects that add up
                  over time. It’s important to eat a variety of fruits,
                  vegetables, grains, protein foods, and dairy and fortified soy
                  alternatives. Plan ahead, make healthy choices so every bite
                  counts.
                </Typography>
              </FiCardContent>
            </FiCardActionArea>
            <FiCardActions>
              <Button size="small" color="primary">
                Tips for healthy eating
              </Button>
            </FiCardActions>
          </FiCard>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container className={classes.container}>
        {/* Full Material-UI Image Card with action buttons  */}
        <Box my={4}>
          <Typography variant="h6" paragraph align="center">
            Eat 5-9 veggies every day
          </Typography>
          <FiCard className={classes.card}>
            <FiCardActionArea>
              <FiCardMedia
                media="picture"
                alt="would you like to add this habit"
                image="./images/notInHabitList.png"
                title="Add this habit?"
              />
              <FiCardContent className={classes.fiCardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.custom}
                >
                  Healthy Plate
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.fiCardContentTextSecondary}
                  component="p"
                >
                  Not in your daily habit list.
                </Typography>
              </FiCardContent>
            </FiCardActionArea>
          </FiCard>
        </Box>
      </Container>
    );
  }
}

export default VeggiesCard;
