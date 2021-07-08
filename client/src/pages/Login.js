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
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import axios from "axios";


class Login extends React.Component {
    constructor(props) {
        super(props); // Not really important right now

        this.state = {
            isAuthenticated: false, // For later use ith JWT
            email: "",
            password: ""
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
            }
        };

        const data = {
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post("/api/login", data, config)
            .then((response) => {
                if(response.data.success) {
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
                <Redirect to="/about/intro" />
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
                            <b>Log in</b> to OAuth Box
                        </Typography>
                        <p>
                            Don't have an account? <Link>Register</Link>
                        </p>
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
                    </Container>
                </Fade>
            );
        }
        
    }
}

export default Login;