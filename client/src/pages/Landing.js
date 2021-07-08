import "../styles/Landing.css"
import React from "react";
import { NavLink } from "react-router-dom";
import { 
    Button,
    Container,
    Grid,
    Paper
} from "@material-ui/core";
import pic from "../resources/oauth-landing-pic.png"
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

class Landing extends React.Component {
    render() {
        return(
            <Grid container spacing={0}>
                <Grid className="grid-1" item sm={6} xs={12}>
                    <Container className="landing-container">
                        <img src={pic} />
                    </Container>
                </Grid>
                <Grid className="grid-2" item sm={6} xs={12}>
                    <Container>
                        <h1>Check what's inside the OAuth standard.</h1>
                        <p className="landing-description">
                            OAuth Box is a simple way to learn about the most widely-used authentication standard on the Web. Follow our login simulation to see how OAuth works.
                        </p>
                        <Button className="landing-button" component={NavLink} to="/login" color="primary">
                            Check it out<ArrowForwardOutlinedIcon />
                        </Button>
                    </Container>
                </Grid>
            </Grid>
        );
    }
}
export default Landing;

/**
 * class Landing extends React.Component {
    render() {
        return(
            <Grid container spacing={0}>
                <Grid className="grid-1" item sm={6} xs={12}>
                    <Container>
                        <h1>OAuth Box</h1>
                        <h2>Landing</h2>
                    </Container>
                </Grid>
                <Grid className="grid-2" item sm={6} xs={12}>
                    <Button component={NavLink} to="/login" color="primary">Click here for Login</Button>
                </Grid>
            </Grid>
        );
    }
}
 */