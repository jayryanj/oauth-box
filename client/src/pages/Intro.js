import React from "react";
import {
    Container
} from "@material-ui/core"

class Intro extends React.Component {

    render() {
        return(
            <Container>
                <Container>
                    <h1>Welcome (user)!</h1>
                    <h1>
                        What is OAuth?
                    </h1>
                    <p>
                        <b>OAuth</b> (short for "Open Authorization") is a <b>standard</b> or <b>framework</b> for authorization. It allows applications to easily <i>delegate</i> authorization and access to protected resources with third-party applications. OAuth allows users to grant access to applications without sharing their passwords with them. For example, when users try to sign into Yelp, they're given the option to sign in with their Google account. Since authorization is being delegated, Yelp won't know their password to their Google account. There are two versions: OAuth 1.0 and OAuth 2.0. They are notably different from each other. In this article, we will be referring to OAuth 2.0 whenever we generally say "OAuth".
                    </p>
                </Container>
                <Container>
                    <h1>What does OAuth look like?</h1>
                    <p>
                        To the user, OAuth often looks like a "Sign in with _____" button such as the ones shown below:
                    </p>
                </Container>

            </Container>
        );
    }
}

export default Intro;