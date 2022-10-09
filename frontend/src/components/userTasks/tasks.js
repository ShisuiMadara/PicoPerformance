import { Button, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import react from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Card from '../taskCard/card';

import styles from './tasks.module.css';

export default class UTasks extends react.Component {
    wrapLoginOpen = () => {
        const element = document.getElementsByClassName(styles.loginWrapper);
        element[0].style.zIndex = "100";
      };
      wrapLoginClose = () => {
        const element = document.getElementsByClassName(styles.loginWrapper);
        element[0].style.zIndex = "-100";
      };
    
    render() {
        var counter = 0;
        return (
        <>
         <Button style={{width: '100%'}}  className = {styles.cardframe} sx = {{marginBottom: 2}}> 
            <Card/>
        </Button>
        <Divider variant = "middle"  />
        
        </>
        );
    }
}
