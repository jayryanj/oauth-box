import React from "react";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import {
    Container,
    Typography,
    Button,
    Grow,
    Fade
} from "@material-ui/core"
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import "../styles/Confirmation.css";

class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        const url = `${this.props.redirect_uri}?code=${this.props.code}`;
        this.state = {
            code: props.code,
            redirect_uri: props.redirect_uri,
            url: url
        }
    }

    render() {
        return(
            <Container className="confirmation-container">
                <Grow in>
                <CheckCircleOutlinedIcon
                    className="check-mark" 
                    style={{ color: "green", fontSize: "250px" }}
                />
                </Grow>
                <Fade in>
                    <Container>
                        <Typography className="login-header" variant="h4">
                            Successfully logged in!
                        </Typography>
                        <p>
                            Authentication with the third-party service was successful. 
                        </p>
                        <p>
                            {this.state.url}
                        </p>
                    </Container>

                </Fade>
                <Fade in>
                <a href={this.state.url}>
                    <Button type="submit" size="large" className="login-form login-submit" >
                        Continue to OAuth Box <ArrowForwardOutlinedIcon />
                    </Button>
                </a>
                </Fade>
            </Container>
        );
    }
}

export default Confirmation;