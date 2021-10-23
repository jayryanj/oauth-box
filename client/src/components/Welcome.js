import React from "react";
import {
    Container,
    Fade
} from "@material-ui/core"

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
                <Container>
                    <h2 className="welcome">Welcome <i>{this.state.name}! </i></h2>
                </Container>
            </Fade>
        );
    }

}

export default Welcome;
