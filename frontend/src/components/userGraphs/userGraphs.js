import { Grid } from '@mui/material';
import react from 'react';

import styles from './userGraphs.module.css';

class PieChartToday extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }
    render(){
        axios.
    }
}

export default class UserGraphs extends react.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Grid container maxWidth={true} sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} md={4}>
                        Graph 1
                    </Grid>
                    <Grid item xs={12} md={4}>
                        Graph 2
                    </Grid>
                    <Grid item xs={12} md={4}>
                        Graph 3
                    </Grid>
                </Grid>
            </>
        );
    }
}
