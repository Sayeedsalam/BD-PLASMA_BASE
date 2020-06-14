import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Home = props => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="headline" headlineMapping={"h1"}>
            Home
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
