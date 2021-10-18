import "../styles/PaperList.css"
import React from "react";
import {
    Container,
    Paper,
    Grid,
    Grow
} from "@material-ui/core";

class PaperList extends React.Component {
    
    render() {
        return(
            <Grow in={true}>
                <Container className="paperlist-container">
                    <Grid spacing={3} container>
                        <Grid spacing={0} item sm={4} xs={12}>
                            <Paper className="landing-paper" elevation={2}>
                                <Container className="paper-container">
                                    <h3>Delegate Authentication</h3>
                                    <p>
                                        Delegate user login to a third-party service such as Google, Facebook, or Apple.
                                    </p>
                                </Container>

                            </Paper>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Paper  className="landing-paper" elevation={1} >
                                <Container className="paper-container">
                                    <h3>Grant Selective Permissions</h3>
                                    <p>
                                        Users can grant your application selective permissions to access their data such as followers, recent posts, or direct messages.
                                    </p>
                                </Container>
                            </Paper>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Paper className="landing-paper" elevation={1} >
                                <Container className="paper-container">
                                    <h3>Protect User Passwords</h3>
                                    <p>
                                        User passwords are hidden away from applications which minimizes the risk of exposure.
                                    </p>
                                </Container>
                            </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        );
    }
}

export default PaperList;