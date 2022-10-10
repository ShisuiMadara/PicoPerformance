import { Grid } from '@mui/material';
import react from 'react';
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from './userGraphs.module.css';

class PieChartToday extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }
    render(){
        var er = false
        var dt = new Date();
        axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/piechart', {
            "EmployeeId" : this.props.user.EmployeeId,
            "StartDate" : (this.props.filter[0].getFullYear()) + '-' + ((this.props.filter[0].getMonth().ToString().length === 1 && this.props.filter[0].getMonth()!== 9)? '0' + (this.props.filter[0].getMonth() + 1) : (this.props.filter[0].getMonth() + 1)) + '-' + (this.props.filter[0].getDate().ToString().length === 1 ? '0' + this.props.filter[0].getDate() : this.props.filter[0].getDate()) + ' 00:00:00',
            "EndDate": (this.props.filter[1].getFullYear()) + '-' + ((this.props.filter[1].getMonth().ToString().length === 1 && this.props.filter[1].getMonth() !== 9)? '0' + (this.props.filter[1].getMonth() + 1) : (this.props.filter[1].getMonth() + 1)) + '-' + (this.props.filter[1].getDate().ToString().length === 1 ? '0' + this.props.filter[1].getDate() : this.props.filter[1].getDate()) + ' 23:59:59'
        }).then((response)=>{
            if (response.data.success === true){
                this.setState({data: response.data.data.Details})
            }
        }).catch((err) =>{
            if(err) er = true;
        })
        if (er){
            return(
                <Text>Chart Cannot Be displayed!</Text>
            )
        }
        const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
        const chartData = [
            {
                "name" : "Break Time",
                "value" : this.data.Break.Sum == null ? 0 : this.data.Break.Sum
            },
            {
                "name" : "Meeting Time",
                "value" : this.data.Meeting.Sum == null ? 0 : this.data.Meeting.Sum
            },
            {
                "name" : "Work Time",
                "value" : this.data.Work.Sum == null ? 0 : this.data.Work.Sum
            }
        ]
        const tooltipData=[
            {
                "name" : "Break Time",
                "value" : this.data.Break.Sum,
                "value2": this.data.Break.Count
            },
            {
                "name" : "Meeting Time",
                "value" : this.data.Meeting.Sum,
                "value2" : this.data.Meeting.Count
            },
            {
                "name" : "Work Time",
                "value" : this.data.Work.Sum,
                "value2" : this.data.Work.Count
            }
        ]
        return (
            <PieChart width={400} height={400}>
              <Pie
                data={chartData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, item, index, payload) => {
                if (name === 'Break'){
                    value = value + ' minutes (' + tooltipData[0].value2 + ' Entries)'
                }
                else if (name == 'H')
                return [value, name]
              }} />
              <Legend />
            </PieChart>
          );
    }
}

class PieChartYesterDay extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }
    render(){
        var er = false
        var dt = new Date();
        this.props.filter[0].setDate(this.props.filter[0].getDate() - 1);
        this.props.filter[1].setDate(this.props.filter[1].getDate() - 1);
        const StartDate = (this.props.filter[0].getFullYear()) + '-' + ((this.props.filter[0].getMonth().ToString().length === 1 && this.props.filter[0].getMonth()!== 9)? '0' + (this.props.filter[0].getMonth() + 1) : (this.props.filter[0].getMonth() + 1)) + '-' + (this.props.filter[0].getDate().ToString().length === 1 ? '0' + this.props.filter[0].getDate() : this.props.filter[0].getDate());
        const EndDate = (this.props.filter[1].getFullYear()) + '-' + ((this.props.filter[1].getMonth().ToString().length === 1 && this.props.filter[1].getMonth() !== 9)? '0' + (this.props.filter[1].getMonth() + 1) : (this.props.filter[1].getMonth() + 1)) + '-' + (this.props.filter[1].getDate().ToString().length === 1 ? '0' + this.props.filter[1].getDate() : this.props.filter[1].getDate());
        if (StartDate != EndDate){
            return(
                <Text>Chart is not availabe when filter spans more than 1 date</Text>
            )
        }
        axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/piechart', {
            "EmployeeId" : this.props.user.EmployeeId,
            "StartDate" : StartDate + '00:00:00',
            "EndDate": EndDate + '23:59:59'
        }).then((response)=>{
            if (response.data.success === true){
                this.setState({data: response.data.data.Details})
            }
        }).catch((err) =>{
            if(err) er = true;
        })
        if (er){
            return(
                <Text>Chart Cannot Be displayed!</Text>
            )
        }
        const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
        const chartData = [
            {
                "name" : "Break Time",
                "value" : this.data.Break.Sum == null ? 0 : this.data.Break.Sum
            },
            {
                "name" : "Meeting Time",
                "value" : this.data.Meeting.Sum == null ? 0 : this.data.Meeting.Sum
            },
            {
                "name" : "Work Time",
                "value" : this.data.Work.Sum == null ? 0 : this.data.Work.Sum
            }
        ]
        const tooltipData=[
            {
                "name" : "Break Time",
                "value" : this.data.Break.Sum,
                "value2": this.data.Break.Count
            },
            {
                "name" : "Meeting Time",
                "value" : this.data.Meeting.Sum,
                "value2" : this.data.Meeting.Count
            },
            {
                "name" : "Work Time",
                "value" : this.data.Work.Sum,
                "value2" : this.data.Work.Count
            }
        ]
        return (
            <PieChart width={400} height={400}>
              <Pie
                data={chartData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, item, index, payload) => {
                if (name === 'Break'){
                    value = value + ' minutes (' + tooltipData[0].value2 + ' Entries)'
                }
                else if (name == 'H')
                return [value, name]
              }} />
              <Legend />
            </PieChart>
          );
    }
}

class StackedChart extends react.Component{
    constructor(props){
        super(props);
        this.state={
            data:{}
        }
    }
    render(){
        var er = false;
        
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
                        <PieChartToday user={this.props.user} filter={this.props.filter} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PieChartYesterDay user={this.props.user} filter={this.props.filter}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        Graph 3
                    </Grid>
                </Grid>
            </>
        );
    }
}
