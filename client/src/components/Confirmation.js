import React from "react";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import {
    Container,
    Typography,
    Button
} from "@material-ui/core"
import "../styles/Confirmation.css";


class Confirmation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container className="confirmation-container">
                <CheckCircleOutlinedIcon c
                    className="check-mark" 
                    style={{ color: "green", fontSize: "250px" }}
                />
                <Typography className="login-header" variant="h4">
                    Successfully logged in!
                </Typography>
                <a href="http://localhost:3000/about/intro">
                    <Button type="submit" size="large" className="login-form login-submit" >
                        Continue with 3rd party app
                    </Button>
                </a>
            </Container>
        );
    }
}

export default Confirmation;