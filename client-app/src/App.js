import React, { Component } from 'react';
import './App.css';

import { compose } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

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

    const store = configureStore({});

    return (
        <Provider store={store}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <Paper zDepth={1} className="App">

            </Paper>
          </MuiThemeProvider>
        </Provider>
    );
  }
}

export default App;
