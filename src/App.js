import React, { useState } from 'react';
import './App.css';
import 'typeface-roboto';
import UserLogin from './components/UserLogin.js'
import TimetableView from './components/TimetableView.js'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { auth } from './utils/auth';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const [id, setID] = useState(null);
  // get('identifier').then(val => setID(val));
  // console.log(id); 
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRoute path="/timetable">
              <TimetableView />
            </PrivateRoute>
            <Route path="/">
              <UserLogin />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
