import { Grid } from '@mui/material';
import react from 'react';
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from './userGraphs.module.css';

class PieChartToday extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            er: true,
            data: {}
        }
    }
    render(){

        if (this.state.er){
            return(
                <text>Chart Cannot Be displayed!</text>
            )
        }
        const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
        const chartData = [
            {
                "name" : "Break Time",
                "value" : this.state.data.Break.Sum == null ? 0 : this.state.data.Break.Sum
            },
            {
                "name" : "Meeting Time",
                "value" : this.state.data.Meeting.Sum == null ? 0 : this.state.data.Meeting.Sum
            },
            {
                "name" : "Work Time",
                "value" : this.state.data.Work.Sum == null ? 0 : this.state.data.Work.Sum
            }
        ]
        const tooltipData=[
            {
                "name" : "Break Time",
                "value" : this.state.data.Break.Sum,
                "value2": this.state.data.Break.Count
            },
            {
                "name" : "Meeting Time",
                "value" : this.state.data.Meeting.Sum,
                "value2" : this.state.data.Meeting.Count
            },
            {
                "name" : "Work Time",
                "value" : this.state.data.Work.Sum,
                "value2" : this.state.data.Work.Count
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
    componentDidMount() {
        axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/piechart', {
            "EmployeeId" : this.props.user.EmployeeId,
            "StartDate" : this.props.filter[0] + ' 00:00:00',
            "EndDate" : this.props.filter[1] + ' 23:59:59'
        }, {
            headers: {
                Authorization: `Bearer ${this.props.user.token}`
            }
        }).then((response)=>{
            if (response.data.success === true){
                this.setState({
                    er: false,
                    data: response.data.data.Details
                })

            }
        }).catch((err) =>{
            if(err) {
                this.setState({
                    er: true,
                })
            }
        })
    }
}

class PieChartYesterDay extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            er: true,
            data: {}
        }
    }
    render(){
        if (this.props.filter[0] != this.props.filter[1]){
            return(
                <text>Chart is not availabe when filter spans more than 1 date</text>
            )
        }
        if (this.state.er){
            return(
                <text>Chart Cannot Be displayed!</text>
            )
        }
        const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
        const chartData = [
            {
                "name" : "Break Time",
                "value" : this.state.data.Break.Sum == null ? 0 : this.state.data.Break.Sum
            },
            {
                "name" : "Meeting Time",
                "value" : this.state.data.Meeting.Sum == null ? 0 : this.state.data.Meeting.Sum
            },
            {
                "name" : "Work Time",
                "value" : this.state.data.Work.Sum == null ? 0 : this.state.data.Work.Sum
            }
        ]
        const tooltipData=[
            {
                "name" : "Break Time",
                "value" : this.state.data.Break.Sum,
                "value2": this.state.data.Break.Count
            },
            {
                "name" : "Meeting Time",
                "value" : this.state.data.Meeting.Sum,
                "value2" : this.state.data.Meeting.Count
            },
            {
                "name" : "Work Time",
                "value" : this.state.data.Work.Sum,
                "value2" : this.state.data.Work.Count
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
    componentDidMount() {
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
                    data: response.data.data.Details
                })
            }
        }).catch((err) =>{
            if(err) {
                this.setState({
                    er: true,
                })
            }
        })
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
    }
    render() {
        return (
            <>
                <Grid container maxWidth={true} sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'}>
                    <Grid className={styles.graph} item xs={12} lg={4} sx={{textAlign: 'center', width: '100%'}} >
                        <PieChartToday user={this.props.user} filter={this.props.filter} />
                    </Grid>
                    <Grid className={styles.graph} item xs={12} lg={4} sx={{textAlign: 'center', width: '100%'}}>
                        <PieChartYesterDay user={this.props.user} filter={this.props.filter}/>
                    </Grid>
                    <Grid className={styles.graph} item xs={12} lg={4} sx={{textAlign: 'center', width: '100%'}}>
                        Graph 3
                    </Grid>
                </Grid>
            </>
        );
    }
}
