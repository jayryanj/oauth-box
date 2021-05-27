import React from "react";
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


class Login extends React.Component {
    render() {
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
                    <form noValidate autoComplete="off">
                        <div>
                            <TextField variant="outlined" className="login-form" fullWidth id="standard-basic" label="Email" />
                        </div>
                        <div>
                            <TextField type="password" variant="outlined" className="login-form" fullWidth id="standard-basic" label="Password" />
                        </div>
                        <div>
                            <Button fullWidth size="large" className="login-form login-submit" >Login</Button>
                        </div>
                    </form>
                </Container>
            </Fade>
        );
    }
}

export default Login;