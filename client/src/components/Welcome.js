import React from "react";
import {
    Container,
    Fade
} from "@material-ui/core"
import styles from "../styles/Welcome.module.css";

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
                <Container className={styles.container}>
                    <h1 className={styles.hello}>Hello!</h1>
                    <p className={styles.welcome}>It's good to see you, <i>{this.state.name}.</i></p>
                </Container>
            </Fade>
        );
    }

}

export default Welcome;
