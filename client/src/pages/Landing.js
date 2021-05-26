import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

class Landing extends React.Component {
    render() {
        return(
            <Container className="landing-container-main">
                <h1>OAuth Box</h1>
                <h2>Landing</h2>
                <Button component={NavLink} to="/login" color="primary">Click here for Login</Button>
            </Container>
        );
    }
}

export default Landing;