import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import NextButton from './next_button';
import PreviousButton from './previous_button';
import SlideCounter from './slide_counter';

export default class Slide extends Component {

	constructor(props){
		super(props);

		this.state = {
			background: this.getRandomColor(),
			shouldAnimateClass: "animated"
		};
	}

	//will have to rewrite this mess
	componentWillReceiveProps(nextProps){
		if(nextProps.isActive){
			this.setState({
				background: this.getRandomColor(),
				shouldAnimateClass: "animated"
			});
		}else{
			if(this.props.isActive){
				this.setState(prevState => ({
					background: prevState.background,
					shouldAnimateClass: "animated"
				}));
			}else{
				this.setState(prevState => ({
					background: prevState.background,
					shouldAnimateClass: ""
				}));
			}
		}
	}

	componentDidMount(){
		this.highlightCodeBlocks();
	}

	//use highlight.js
	highlightCodeBlocks(){
		let slideCodes = document.getElementsByTagName('code');
		for(let i = 0; i < slideCodes.length; i++){
			hljs.highlightBlock(slideCodes[i]);
		}	
	}

	getRandomColor(){
		const colors = [
			'#57E557',
			'#810784',
			'#57E5DE',
			'#EF4C72',
			'#EFA447'
		];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	render(){
		//no slide yet
		if(!this.props.slide) return <div className="no-slide">...loading</div>;

		//get heading
		const getHeading = () => {
			if(this.props.slide.heading){
				return (
					<div className="text-center">
						<h1>{this.props.slide.heading}</h1>
					</div>
				);
			}
		};

		const getBullets = () => {
			if(this.props.slide.bullets){
				return (
					<div className="bullet-container">
						<ul>
							{bulletItems}
						</ul>
					</div>
				);
			}
		};

		//render bullet list
		//setting html not dangerous if it's your own content
		const bulletItems = this.props.slide.bullets.map((bullet, index) => {
			return (
				<li dangerouslySetInnerHTML={{__html: bullet}} key={index}></li>
			);
		});

		const getCode = () => {
			if (this.props.slide.code){
				return (
					<pre>
						<code className={this.props.slide.code.type}>
							{this.props.slide.code.content}
						</code>
					</pre>
				);
			}
		};

		//determine whether slide is active and get current animation
		const getClasses = () => {
			if(this.props.isActive) return `slide active ${this.props.animationClass} ${this.state.shouldAnimateClass}`;
			return `slide inactive ${this.props.animationClass} ${this.state.shouldAnimateClass}`;
		};

		return (
			<div className={getClasses()} style={{ backgroundColor: this.state.background }}>
				<div className="slide-content">
					{getHeading()}
					{getBullets()}
					{getCode()}
				</div>
				<div className="text-center button-container">
			        <PreviousButton onPrev={() => this.props.onPrev()} />
			        <NextButton onNext={() => this.props.onNext()} />
					<SlideCounter currentSlide={this.props.slideIndex} totalSlides={this.props.totalSlides} />
				</div>
			</div>
		);
	}
}