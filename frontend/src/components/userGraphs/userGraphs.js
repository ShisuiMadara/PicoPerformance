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
                "name" : "Break",
                "value" : this.props.data.Break.Sum == null ? 0 : this.props.data.Break.Sum
            },
            {
                "name" : "Meeting",
                "value" : this.props.data.Meeting.Sum == null ? 0 : this.props.data.Meeting.Sum
            },
            {
                "name" : "Work",
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
        console.log(tooltipData)
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
                "name" : "Break",
                "value" : this.props.data.Break.Sum == null ? 0 : this.props.data.Break.Sum
            },
            {
                "name" : "Meeting",
                "value" : this.props.data.Meeting.Sum == null ? 0 : this.props.data.Meeting.Sum
            },
            {
                "name" : "Work",
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
            loaded: [false, false, true],
            er: [true, true, false],
            data: [{}, {}, {}],
            filter: props.filter
        }
    }
    componentWillReceiveProps(props) {
        if(this.state.filter != props.filter || this.state.user != props.user) {
            this.setState({
                loaded: [false, false, true],
                err: [true, true, false],
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
                    var ldd = this.state.loaded
                    var errd = this.state.errd
                    var datadd = this.state.data
                    ldd[0] = true
                    errd[0] = false
                    datadd[0] = response.data.data.Details
                    this.setState({
                        loaded: ldd,
                        er: errd,
                        data: datadd,
                    });
                }
            }).catch((err) =>{
                if(err) {
                    var ldd = this.state.loaded
                    var errd = this.state.errd
                    ldd[0] = true
                    errd[0] = true
                    this.setState({
                        loaded : ldd,
                        er : errd,
                    })
                }
            })
            axios.post('http://picoperformance.centralindia.cloudapp.azure.com:5000/api/piechart', {
                "EmployeeId" : props.user.EmployeeId,
                "StartDate" : props.filter[0] + ' 00:00:00',
                "EndDate": props.filter[1] + ' 23:59:59',
                "Yesterday" : true
            },{
                headers: {
                    Authorization: `Bearer ${props.user.token}`
                }
            }).then((response)=>{
                if (response.data.success === true){
                    var ldd = this.state.loaded
                    var errd = this.state.errd
                    var datadd = this.state.data
                    ldd[1] = true
                    errd[1] = false
                    datadd[1] = response.data.data.Details
                    this.setState({
                        loaded: ldd,
                        er: errd,
                        data: datadd,
                    });
                }
            }).catch((err) =>{
                if(err) {
                    var ldd = this.state.loaded
                    var errd = this.state.errd
                    ldd[1] = true
                    errd[1] = true
                    this.setState({
                        loaded : ldd,
                        er : errd,
                    })
                }
            })
        }
    }
    render() {
        if(this.state.loaded[0] === false || this.state.loaded[1] === false || this.state.loaded[2] === false) {
            return <>Loading Charts...</>
        }
        if (this.state.er[0] || this.state.er[1] || this.state.er[2]){
            return(
                <text>Chart Cannot Be displayed!</text>
            )
        }
        // console.log(this.state.data)
        return (
            <>
                <Grid container maxWidth={true} sx={{display: 'flex'}} alignContent={'center'} alignItems={'center'}>
                    <Grid className={styles.graph} item xs={12} lg={4} sx={{textAlign: 'center', width: '100%'}} >
                        <PieChartToday data={this.state.data[0]} user={this.props.user} filter={this.state.filter} />
                    </Grid>
                    <Grid className={styles.graph} item xs={12} lg={4} sx={{textAlign: 'center', width: '100%'}}>
                        <PieChartYesterDay data={this.state.data[1]} user={this.props.user} filter={this.state.filter}/>
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
