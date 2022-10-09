import { Button, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import react from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Card from '../taskCard/card';
import Login from '../wrapperLogin/login';
import TaskCardDesc from '../taskCardDesc/taskCardDesc';

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
  // let task;
  constructor(props){
    super(props);
  }

    render() {
        var counter = 0;
        return (
        <>
        <div className={styles.loginWrapper}>
          <TaskCardDesc onClose={this.wrapLoginClose}/>
      </div>
         <Button style={{width: '100%'}}  className = {styles.cardframe} sx = {{marginBottom: 2}}  variant="outlined" color="error" onClick={this.wrapLoginOpen} task={this.props.task}> 
            <Card/>
        </Button>
        <Divider variant = "middle"  />
        
        </>
        );
    }
}
