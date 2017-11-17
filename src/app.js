import React, {Component} from 'react';
import Loader from './components/loader';
import Slide from './components/slide';
import NextButton from './components/next_button';
import PreviousButton from './components/previous_button';
import 'styles/highlight.css';
import 'styles/index.scss';
import axios from 'axios';


const apiPath = 'data/slides.json';

export default class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			currentSlide: 0,
			slides: false
		};

		//bind events
		this.handleOnNext = this.handleOnNext.bind(this);
		this.handleOnPrev = this.handleOnPrev.bind(this);
	}

	componentDidMount(){
		//get slides with ajax
		axios.get(apiPath)
		.then(response => {
			this.setState({
				slides: response.data.slides
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	handleOnNext(){
		if(this.state.currentSlide < this.state.slides.length - 1){
			this.setState(prevState => ({
				currentSlide: prevState.currentSlide + 1
			}));
		}
	}

	handleOnPrev(){
		if(this.state.currentSlide > 0){
			this.setState(prevState => ({
				currentSlide: prevState.currentSlide - 1
			}));
		}
	}

	getAnimationClass(){
		let animationClass = "";
		let animationClassIndex = Math.floor(Math.random() * 4) + 1;
		switch(animationClassIndex){
			case 1:
				animationClass="animate-left";
				break;
			case 2:
				animationClass="animate-right";
				break;
			case 3:
				animationClass="animate-top";
				break;
			case 4:
				animationClass="animate-bottom";
				break;
			default:
				animationClass="animate-left";
				break;
		}
		return animationClass;
	}

  	render() {
  		let animationClass = this.getAnimationClass();

  		let getSlides = (currentSlide) => {
	  		if(!this.state.slides) return <div>loading ...</div>;

	  		const totalSlides = this.state.slides.length;

	  		return this.state.slides.map((slide, index) => {
	  			let isActiveSlide = index === currentSlide;
	  			return <Slide
							slide={slide}
							isActive={isActiveSlide}
							animationClass={animationClass}
							slideIndex={index + 1}
							totalSlides={totalSlides}
							onPrev={this.handleOnPrev}
							onNext={this.handleOnNext} />
	  		});
	  	}

    	return (
	      <div>
	      	<Loader />
	        {getSlides(this.state.currentSlide)}
	      </div>
    	);
  	}
}