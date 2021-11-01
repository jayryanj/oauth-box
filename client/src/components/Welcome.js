import React from "react";
import {
    Container,
    Fade
} from "@material-ui/core"
import "../styles/Welcome.css";

class Welcome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name
        }
    }

    render() {
        return(
            <Fade in>
                <Container className="welcome-container">
                    <h1 className="hello-header">Hello!</h1>
                    <p className="welcome-header">It's good to see you, <i>{this.state.name}.</i></p>
                </Container>
            </Fade>
        );
    }

}

export default Welcome;
