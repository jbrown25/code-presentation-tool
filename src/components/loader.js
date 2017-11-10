import React, {Component} from 'react';

export default class Loader extends Component {

	constructor(props){
		super(props);

		this.state = {
			loadingClass: "loader",
			backgroundColor: this.getRandomColor()
		};
	}

	componentDidMount(){
		//the loading animation is timed, not bound to the onload event.  Its only purpose
		//is to hide the initial "flip" animation of the first slide
		this.fadeOutLoader();
	}

	getRandomColor(){
		const colors = [
			'#57E557',
			'#A2E57B',
			'#57E5DE',
			'#EF4C72',
			'#EFA447'
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	fadeOutLoader(){
		window.setTimeout(() => {
			this.setState({
				loadingClass: "loader fading"
			});

			window.setTimeout(() => {
				this.setState({
					loadingClass: "loader faded"
				});
			}, 500);
		}, 2000);
	}

	render(){
		return (
			<div className={this.state.loadingClass} style={{backgroundColor: this.state.backgroundColor}}>
				<div className="sk-cube-grid">
				  <div className="sk-cube sk-cube1"></div>
				  <div className="sk-cube sk-cube2"></div>
				  <div className="sk-cube sk-cube3"></div>
				  <div className="sk-cube sk-cube4"></div>
				  <div className="sk-cube sk-cube5"></div>
				  <div className="sk-cube sk-cube6"></div>
				  <div className="sk-cube sk-cube7"></div>
				  <div className="sk-cube sk-cube8"></div>
				  <div className="sk-cube sk-cube9"></div>
				</div>
			</div>
		);
	}
}