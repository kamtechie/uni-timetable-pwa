import React, { useState } from 'react';
import './App.css';
import 'typeface-roboto';
import UserLogin from './components/UserLogin.js'
import TimetableView from './components/TimetableView.js'
import { get } from 'idb-keyval';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [id, setID] = useState(null);
  get('identifier').then(val => setID(val));

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
        {id ? <TimetableView /> : <UserLogin />}
      </ThemeProvider>
    </div>
  );
}

export default App;
