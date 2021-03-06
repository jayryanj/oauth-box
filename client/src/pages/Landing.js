import "../styles/Landing.css"
import React from "react";
import { NavLink } from "react-router-dom";
import { 
    Button,
    Container,
    Grid,
    Fade
} from "@material-ui/core";
import pic from "../resources/oauth-landing-pic.png"
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

import PaperList from "../components/PaperList";

class Landing extends React.Component {
    render() {
        return(
            <Fade in={true}>
                <Grid className="landing-grid" container spacing={0}>
                    <Grid className="grid-1" item sm={6} xs={12}>
                        <Container>
                            <img alt="grpahic" src={pic} /> 
                        </Container>
                    </Grid>
                    <Grid className="grid-2" item sm={6} xs={12}>
                        <Container className="landing-container">
                            <h1>Check what's inside the OAuth 2.0 standard.</h1>
                            <Container className="landing-description-container">
                                <p className="landing-description">
                                    OAuth Box is a simple way to learn about the most widely-used authentication standard on the Web. Follow our login simulation to see how OAuth works.
                                </p>
                            </Container>

                            <Button className="landing-button" component={NavLink} to="/simulation" color="primary">
                                Check it out<ArrowForwardOutlinedIcon />
                            </Button>
                        </Container>
                    </Grid>
                    <Grid className="grid-3" item xs={12}>
                        <h2>What does OAuth do?</h2>
                        <PaperList />
                    </Grid>
                </Grid>
            </Fade>
        );
    }
}
export default Landing;
