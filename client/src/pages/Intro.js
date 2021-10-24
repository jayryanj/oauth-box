import "../styles/Intro.css"
import React from "react";
import {
    Container,
    LinearProgress
} from "@material-ui/core"
import axios from "axios";
import Welcome from "../components/Welcome";
import buttonsPic from "../resources/OAuth_buttons.png"

class Intro extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: undefined,
            loading: true
        }
    }

    render() {

        return(
            <Container className="intro-container">
                {
                    this.state.loading 
                    ?
                        <Container className="progress-container">
                            <LinearProgress size={"10em"} />
                        </Container>
                    :
                        <Container>
                            <Welcome name={this.state.name} />
                        </Container>
                }
            </Container>
        );
    }

    componentDidMount() {
        axios.get("/api/user").then((response) => {
            this.setState({name: response.data.data.name });
            this.setState({loading: false})
        });
    }
}

export default Intro;