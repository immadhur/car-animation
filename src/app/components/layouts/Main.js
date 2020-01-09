import React from 'react';
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';
import $ from 'jquery';
import MapView from '../Map/MapView';

class Main extends React.Component {

    state={
        isNavigationStarted:false
    }

    startNavigationHandler=()=>{
        this.state.isNavigationStarted ?
            this.setState({isNavigationStarted:false}):
            this.setState({isNavigationStarted:true})
    }

    render() {
        let wrapperClass = "gray-bg " + this.props.location.pathname;
        return (
            <div id="wrapper">
                <Progress />
                <Navigation clickHandler={this.startNavigationHandler} isStarted={this.state.isNavigationStarted} location={this.props.location}/>

                <div id="page-wrapper" className={wrapperClass}>

                    <TopHeader />
                    {console.log('ch',this.props.children)}
                    {this.props.children} 
                    <MapView isStarted={this.state.isNavigationStarted}/>

                    <Footer />

                </div>

            </div>

        )
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}

export default Main