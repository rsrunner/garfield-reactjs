import React, { Component } from 'react';

const dayfield = new RegExp(/\$([a-zA-Z]+)/i)

export default class Comic extends Component {

	constructor(props){
		super(props);
		this.state = { 
			format: [
				"http://picayune.uclick.com/comics/ga/$yyyy/ga$yy$mm$dd.gif",
				"http://picayune.uclick.com/comics/ga/$yyyy/ga$yy$mm$dd.jpg"
			],
			formatIdx: 0,
			src: "" 
		};
	}

	componentDidMount(){
		this.fetchComicUrl();
	}

	getUrl(){
		if(isNaN(this.props.date)){ return "" } // try not to spam the server
		var url = this.state.format[this.state.formatIdx];
		while(url.match(dayfield)){
			var match = url.match(dayfield);
			var zeroes = match[1].length;
			var target = "";
			switch(match[1].toLowerCase().charAt(0)){
				case "y":
					target = this.props.date.getFullYear();
					break;
				case "m":
					target = this.props.date.getMonth()+1;
					break;
				case "d":
					target = this.props.date.getDate();
					break;
				default:
					break;
			}
			target = target.toString().padStart(zeroes, "0").slice(-zeroes);
			url = url.replace(dayfield, target);
		}
		return url;
	}

	fetchComicUrl(){
		// usually this is where id make an xhr to ucomics to get the image url but cors is an asshole so im using another source
		this.setState({src: this.getUrl()});
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.format !== prevState.format || this.state.formatIdx !== prevState.formatIdx || this.props.date !== prevProps.date){
			this.fetchComicUrl();
		}
	}

	onError = () => { // why does this work???
		this.setState((state, props) => {
			return { formatIdx: (state.formatIdx+1)%this.state.format.length }
		});
	}

	render(){
		return (
			<img src={this.state.src} onError={this.onError} alt="Garfield comic"></img>
		);
	}
}
