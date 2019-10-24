import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { set } from 'idb-keyval';

const useStyles = makeStyles(theme => ({
    loginRoot: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default
    },
    identifierEntry: {
        width: '90%',
        maxWidth: '500px'
    },
    urlField: {
        width: '100%'
    }
}));

export default function UserLogin() {
    const [url, setUrl] = useState(null);
    const classes = useStyles();

    function onChange(e) {
        setUrl(e.target.value);
    }
    //parses identifier from timetable URL
    function onSubmit() {
        const params = new URLSearchParams(url.split('?')[1]);
        const id = params.get('identifier');
        set('identifier', id); //stores in indexeddb
    }
    return (
        <div className={classes.loginRoot}>
            <div className={classes.identifierEntry}>
                <TextField
                    id="timetable-url"
                    label="Timetable URL"
                    margin="normal"
                    variant="outlined"
                    className={classes.urlField}
                    onChange={onChange}
                />
                <Button variant="contained" color="primary" className={classes.urlField} onClick={onSubmit}>
                    Access Timetable
                </Button>
            </div>
        </div>
    );
}