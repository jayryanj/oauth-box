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

                            <Container>
                                <h2>
                                    What is OAuth?
                                </h2>
                                <p>
                                    <b>OAuth</b> (short for "Open Authorization") is a <b>standard</b> or <b>framework</b> for authorization. It allows applications to easily <i>delegate</i> authorization and access to protected resources with third-party applications. OAuth allows users to grant access to applications without sharing their passwords with them. For example, when users try to sign into Yelp, they're given the option to sign in with their Google account. Since authorization is being delegated, Yelp won't know their password to their Google account. There are two versions: OAuth 1.0 and OAuth 2.0. They are notably different from each other. In this article, we will be referring to OAuth 2.0 whenever we generally say "OAuth".
                                </p>
                            </Container>
                            <Container>
                                <h2>What does OAuth look like?</h2>
                                <p>
                                    To the user, OAuth often looks like a "Sign-in/Continue with _____" button. 
                                </p>
                                <img src={buttonsPic} alt="buttons" />
                                <p>
                                    These buttons initialize the OAuth flow with the service that you choose whether it's Google, Facebook, etc.
                                </p>
                            </Container>
                            <Container>
                                <h2>Parts of the OAuth Authorization Code Flow</h2>
                                <p>There are four entities involved in the OAuth 2.0 authorization code flow:</p>
                                <p>
                                    <b>Resource Owner</b> - Typically the user that owns the data that the client web app is trying to access
                                </p>
                                <p>
                                    <b>Client</b> - A web application that is using OAuth to request access to the resource owner's data.
                                </p>
                                <p>
                                    <b>Authorization Server</b> - The server for the third-party service that handles authorization requests from clients to access the protected resources. THe authorization grants access by authenticating the resource owner and authorization the client by exchanging an access token.
                                </p>
                                <p>
                                    <b>Resource Server</b> - The server for the third-party service which holds the protected resources of the owner.
                                </p>
                            </Container>
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