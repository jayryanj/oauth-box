import { Button, Container } from "@material-ui/core";
import React from "react";

class Simulation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <Button>
                    Continue with OAuth Box
                </Button>
            </Container>
        );
    }
}

export default Simulation;