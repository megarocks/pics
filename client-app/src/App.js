import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Paper zDepth={1} className="App">
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;
