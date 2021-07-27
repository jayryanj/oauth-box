import { NavLink } from "react-router-dom";
import React from "react";
import { 
    Button, 
    Container,
    Typography,
    TextField,
    Fade
} from "@material-ui/core";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

class Simulation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fade in={true} >
            <Container className="login-container-main">
                <Container className="login-container-home">
                    <Button className="login-button" component={NavLink} to="/" >
                        <ArrowBackOutlinedIcon  /> Back to Home
                    </Button>
                </Container>

                <Typography className="login-header" variant="h3">
                    <b>Log in</b> to OAuth Box
                </Typography>

                <a href="http://localhost:8080/api/oauth/redirect">
                <Button type="submit" fullWidth size="large" className="login-form login-submit" >
                    Continue with 3rd party app
                </Button>
                </a>
            </Container>
        </Fade>
        );
    }
}

export default Simulation;