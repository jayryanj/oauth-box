import styles from "../styles/Description.module.css";
import React from "react";
import {
    Container,
    Tabs,
    Tab
} from "@material-ui/core";


class Description extends React.Component{
    render() {

        return(
            <Container className={styles.container}>
                <Tabs centered>
                    <Tab label="OAuth 2.0"/>
                    <Tab label="Actors"/>
                    <Tab label="Authorization Code Flow"/>
                    <Tab label="Tokens" />
                </Tabs>
            </Container>
        );


        /*return(
            <Container>
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
        );*/
    }
}

export default Description;