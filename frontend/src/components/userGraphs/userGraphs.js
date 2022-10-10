import { Grid } from '@mui/material';
import react from 'react';
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from './userGraphs.module.css';

class PieChartToday extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            filter: props.filter,
            data: props.data
        }
    }
    componentWillReceiveProps(props) {
        if(props.filter != this.state.filter) {
            this.setState({
                filter: props.filter,
                data: props.data
            })
        }
    }
    render(){
        const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
        const chartData = [
            {
                "name" : "Break Time",
                "value" : this.props.data.Break.Sum == null ? 0 : this.props.data.Break.Sum
            },
            {
                "name" : "Meeting Time",
                "value" : this.props.data.Meeting.Sum == null ? 0 : this.props.data.Meeting.Sum
            },
            {
                "name" : "Work Time",
                "value" : this.props.data.Work.Sum == null ? 0 : this.props.data.Work.Sum
            }
        ]
        const tooltipData=[
            {
                "name" : "Break Time",
                "value" : this.props.data.Break.Sum,
                "value2": this.props.data.Break.Count
            },
            {
                "name" : "Meeting Time",
                "value" : this.props.data.Meeting.Sum,
                "value2" : this.props.data.Meeting.Count
            },
            {
                "name" : "Work Time",
                "value" : this.props.data.Work.Sum,
                "value2" : this.props.data.Work.Count
            }
        ]
        return (
            <PieChart width={400} height={400}>
              <Pie
                data={chartData}
                cx={180}
                cy={200}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, item, index, payload) => {
                if (name === 'Break'){
                    value = value + ' minutes (' + tooltipData[0].value2 + ' Entries)'
                }
                else if (name == 'Meeting'){
                    value = value + ' minutes (' + tooltipData[1].value2 + ' Entries)'
                }
                else{
                    value = value + ' minutes (' + tooltipData[2].value2 + ' Entries)'
                }
                return [value, name]
              }} />
              <Legend className={styles.legend} />
            </PieChart>
          );
    }
}

class PieChartYesterDay extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            filter: props.filter,
            data: props.data
        }
    }
    componentWillReceiveProps(props) {
        if(props.filter != this.state.filter) {
            this.setState({
                filter: props.filter,
                data: props.data
            })
        }
    }
    render(){
        if (this.props.filter[0].slice(0, 10) != this.props.filter[1].slice(0,10)){
            console.log(this.props.filter)
            return(
                <text>Chart is not availabe when filter spans more than 1 date</text>
            )
        }
        const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
        const chartData = [
            {
                "name" : "Break Time",
                "value" : this.props.data.Break.Sum == null ? 0 : this.props.data.Break.Sum
            },
            {
                "name" : "Meeting Time",
                "value" : this.props.data.Meeting.Sum == null ? 0 : this.props.data.Meeting.Sum
            },
            {
                "name" : "Work Time",
                "value" : this.props.data.Work.Sum == null ? 0 : this.props.data.Work.Sum
            }
        ]
        const tooltipData=[
            {
                "name" : "Break Time",
                "value" : this.props.data.Break.Sum,
                "value2": this.props.data.Break.Count
            },
            {
                "name" : "Meeting Time",
                "value" : this.props.data.Meeting.Sum,
                "value2" : this.props.data.Meeting.Count
            },
            {
                "name" : "Work Time",
                "value" : this.props.data.Work.Sum,
                "value2" : this.props.data.Work.Count
            }
        ]
        return (
            <PieChart width={400} height={400}>
              <Pie
                data={chartData}
                cx={180}
                cy={200}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, item, index, payload) => {
                if (name === 'Break'){
                    value = value + ' minutes (' + tooltipData[0].value2 + ' Entries)'
                }
                else if (name == 'Meeting'){
                    value = value + ' minutes (' + tooltipData[1].value2 + ' Entries)'
                }
                else{
                    value = value + ' minutes (' + tooltipData[2].value2 + ' Entries)'
                }
                return [value, name]
              }} />
              <Legend className={styles.legend} />
            </PieChart>
          );
    }
}

// class StackedChart extends react.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             data:{}
//         }
//     }
//     render(){
//         var er = false;

//     }
// }

export default class UserGraphs extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            er: true,
            data: {},
            filter: props.filter
        }
    }
    componentWillReceiveProps(props) {
        if(this.state.filter != props.filter) {
            this.setState({
                loaded: false,
                err: true,
                filter: props.filter
            })
            axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/piechart', {
                "EmployeeId" : props.user.EmployeeId,
                "StartDate" : props.filter[0] + ' 00:00:00',
                "EndDate": props.filter[1] + ' 23:59:59'
            },{
                headers: {
                    Authorization: `Bearer ${props.user.token}`
                }
            }).then((response)=>{
                if (response.data.success === true){
                    this.setState({
                        loaded: true,
                        er: false,
                        data: response.data.data.Details,
                    });
                }
            }).catch((err) =>{
                if(err) {
                    this.setState({
                        loaded: true,
                        er: true,
                    })
                }
            })
        }
    }
    render() {
        if(this.state.loaded === false) {
            return <>Loading Charts...</>
        }
        if (this.state.er){
            return(
                <text>Chart Cannot Be displayed!</text>
            )
        }
        // console.log(this.state.data)
        return (
            <>
                <Grid container maxWidth={true} sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'}>
                    <Grid className={styles.graph} item xs={12} lg={4} sx={{textAlign: 'center', width: '100%'}} >
                        <PieChartToday data={this.state.data} user={this.props.user} filter={this.state.filter} />
                    </Grid>
                    <Grid className={styles.graph} item xs={12} lg={4} sx={{textAlign: 'center', width: '100%'}}>
                        <PieChartYesterDay data={this.state.data} user={this.props.user} filter={this.state.filter}/>
                    </Grid>
                    <Grid className={styles.graph} item xs={12} lg={4} sx={{textAlign: 'center', width: '100%'}}>
                        Graph 3
                    </Grid>
                </Grid>
            </>
        );
    }
    componentDidMount() {
        if(this.state.loaded === false) {
            axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/piechart', {
                "EmployeeId" : this.props.user.EmployeeId,
                "StartDate" : this.props.filter[0] + ' 00:00:00',
                "EndDate": this.props.filter[1] + ' 23:59:59'
            },{
                headers: {
                    Authorization: `Bearer ${this.props.user.token}`
                }
            }).then((response)=>{
                if (response.data.success === true){
                    this.setState({
                        er: false,
                        data: response.data.data.Details,
                        loaded: true
                    })
                }
            }).catch((err) =>{
                if(err) {
                    this.setState({
                        er: true,
                        loaded: true
                    })
                }
            })
        }
    }
}
