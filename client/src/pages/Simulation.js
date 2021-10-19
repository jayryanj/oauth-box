import { NavLink } from "react-router-dom";
import React from "react";
import { 
    Button, 
    Container,
    Typography,
    TextField,
    Fade
} from "@material-ui/core";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

class Simulation extends React.Component {
    
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
                    This is a typical login page. For this demonstration, it's disabled. Instead, use OAuth by logging in  with the third-party application!
                </p>

                <form noValidate autoComplete="off">
                    <div>
                        <TextField disabled onChange={this.onChange} name="email" className="login-form" fullWidth id="standard-basic" label="Email" />
                    </div>
                    <div>
                        <TextField disabled onChange={this.onChange} name="password" type="password" className="login-form" fullWidth id="standard-basic" label="Password" />
                    </div>
                    <div>
                        <Button disabled type="submit" fullWidth size="large" className="login-form login-disabled" >Login</Button>
                    </div>
                </form>

                <a href="http://localhost:8080/api/login">
                    <Button type="submit" fullWidth size="large" className="login-form login-submit" >
                        Continue with 3rd party app
                    </Button>
                </a>
            </Container>
        </Fade>
        );
    }
}

export default Simulation;