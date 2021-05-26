import React from "react";
import {
    AppBar, Typography
} from "@material-ui/core";
import "../styles/NavBar.css"
import logo from "../resources/oauth-box-logo.png"

class NavBar extends React.Component {
    render() {
        return(
            <AppBar className="navbar" position="static" >
                <img className="navbar-logo" src={logo} />
            </AppBar>
        );
    }
}

export default NavBar;