import React from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/Login.css";
import { 
    Button,
    Fade,
    Link,
    TextField,
    Typography
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Confirmation from "../components/Confirmation";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props); // Not really important right now

        // Grab the query parameters from the URI to pass back to /authorize endpoint
        const params = new URLSearchParams(this.props.location.search);

        this.state = {
            isAuthenticated: false, // For later use ith JWT
            email: "",
            password: "",
            response_type: params.get("response_type"),
            client_id: params.get("client_id"),
            scope: params.get("scope"),
            redirect_uri: params.get("redirect_uri"),
            oauth_state: params.get("state"),
            code: undefined
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "response_type": this.state.response_type,
                "client_id": this.state.client_id,
                "scope": this.state.scope,
                "redirect_uri": this.state.redirect_uri,
                "state": this.state.oauth_state
            }
        };

        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        
        axios.post("/api/oauth/authorize", data, config)
            .then((response) => {
                if(response.data.success) {
                    console.log(response.data);
                    this.setState({code: response.data.code});
                    this.setState({isAuthenticated: true});
                    console.log(this.state);
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        if (this.state.isAuthenticated) {
            return(
                <Redirect to="/login/authenticated" />
            );
        } else {
            return(
                <Fade in={true} >
                    <Container className="login-container-main">
                        <Container className="login-container-home">
                            <Button className="login-button" component={NavLink} to="/" >
                                <ArrowBackOutlinedIcon  /> Back to Home
                            </Button>
                        </Container>
    
                        <Typography className="login-header" variant="h3">
                            <b>Log in</b> to Third-Party Service
                        </Typography>


                        
                        <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                            <div>
                                <TextField onChange={this.onChange} name="email" variant="outlined" className="login-form" fullWidth id="standard-basic" label="Email" />
                            </div>
                            <div>
                                <TextField onChange={this.onChange} name="password" type="password" variant="outlined" className="login-form" fullWidth id="standard-basic" label="Password" />
                            </div>
                            <div>
                                <Button type="submit" fullWidth size="large" className="login-form login-submit" >Login</Button>
                            </div>
                        </form>

                        <p className="login-text">
                            By continuing, you agree to share your information from this third-party service with OAuth Box.
                        </p>
                        

                    </Container>
                    
                </Fade>
            );
        }
        
    }
}

export default Login;