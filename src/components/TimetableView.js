import React, { useState } from 'react';
import { get } from 'idb-keyval';
import { data } from './test-data.js'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    card: {
        margin: '4px 8px'
    },
    list: {
        backgroundColor: theme.palette.background.default
    },
    listSection: {
        backgroundColor: 'inherit'
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    times: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Roboto' 
    }
}));

export default function TimetableView() {
    const classes = useStyles();
    const [id, setID] = useState(null);
    get('identifier').then(val => setID(val));
    return (
        <div class="timetable-view">
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Timetable
                    </Typography>
                </Toolbar>
            </AppBar>
            <div class="timetable-content">
                <List className={classes.list} subheader={<li />}>
                    {data["timetable"].map((day, index) => (
                        <li key={`day-${index + 1}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <ListSubheader>{daysOfWeek[index]}</ListSubheader>
                                {day.map((event, eventIndex) => (
                                    <React.Fragment>
                                        <Card className={classes.card}>
                                            <ListItem key={`event-${index + 1}-${eventIndex}`} alignItems="flex-start">
                                                <ListItemIcon>
                                                    <div className={classes.times}>
                                                        <span>{event.start}</span>
                                                        <span>{event.end}</span>
                                                    </div>
                                                </ListItemIcon>
                                                <ListItemText primary={event.moduleCode + ' - ' + event.moduleTitle} secondary={
                                                    <React.Fragment>
                                                        <span>{event.type}</span>
                                                        <br />
                                                        <span>{event.location}</span>
                                                    </React.Fragment>
                                                } />
                                            </ListItem>
                                        </Card>
                                    </React.Fragment>
                                ))}
                            </ul>
                        </li>
                    ))}

                </List>
            </div>
        </div >
    )
}
