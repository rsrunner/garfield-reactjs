import React, { Component } from "react";
import './App.css';
import Comic from "./Comic.js";

class App extends Component {
	constructor(props){
		super(props);
		this.state = { 
			min: new Date("1978-06-19T00:00:00"),
			max: new Date(),
			date: new Date()
		};
		this.nextDay = this.nextDay.bind(this);
		this.lastDay = this.lastDay.bind(this);
		this.changeDay = this.changeDay.bind(this);
		this.inputs = {
			year: React.createRef(),
			month: React.createRef(),
			day: React.createRef()
		};
	}

	nextDay(e){
		this.setState((state, props) => {
			var olddate = new Date(state.date);
			var newdate = new Date(state.date.setDate(state.date.getDate()+1));
			var date = newdate <= state.max ? newdate : olddate;
			return { date: date };
		})
	}

	lastDay(e){
		this.setState((state, props) => {
			var olddate = new Date(state.date);
			var newdate = new Date(state.date.setDate(state.date.getDate()-1));
			var date = newdate >= state.min ? newdate : olddate;
			return { date: date };
		})
	}

	updateInput(date){
		this.inputs.year.current.value = date.getFullYear()
		this.inputs.month.current.value = date.getMonth()+1
		this.inputs.day.current.value = date.getDate()
	}

	changeDay(e){
		e.preventDefault();
		var date = new Date(this.inputs.year.current.value, this.inputs.month.current.value-1, this.inputs.day.current.value, 0, 0, 0)
		date = date >= this.state.min ? date : this.state.min;
		date = date <= this.state.max ? date : this.state.max;
		if(!isNaN(date)){
			this.setState(state => ({
				date: date
			}));
		}
	}

	please(date){
		return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${(date.getDate()+1).toString().padStart(2, "0")}`;
	}

	dateInput(){
		var year = this.inputs.year.current;
		var month = this.inputs.month.current;
		var day = this.inputs.day.current;
		console.log(year, month, day)
		if(year && month && day){
			return new Date(year.value, month.value-1, day.value-1, 0, 0, 0)
		}
		else{
			return new Date("invalid");
		}
	}

	componentDidMount(){
		this.updateInput(this.state.date);
	}

	componentDidUpdate(oldProps, oldState){
		if(oldState.date !== this.state.date){
			this.updateInput(this.state.date);
		}
	}

	render(){
		return (
		<div className="App">
			<header className="App-header">
				<p>Garfield <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">ReactJS</a> viewer</p>
				<div className="App-comic_component">
					<div className="App-comic_nav">
						<button onClick={this.lastDay}>Previous</button>
						<form className="App-date_picker" onSubmit={this.changeDay}>
							<input size={2} id="App-date_picker-year" ref={this.inputs.year}></input>
							<input size={1} id="App-date_picker-month" ref={this.inputs.month}></input>
							<input size={1} id="App-date_picker-day" ref={this.inputs.day}></input>
							<input type="submit" style={{display: "none"}}></input>
						</form>
						<button onClick={this.nextDay}>Next</button>
					</div>
					<Comic date={this.state.date} min={this.state.min} max={this.state.max}/>
				</div>
			</header>
		</div>
	);
	}
}

export default App;
