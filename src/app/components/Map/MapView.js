import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import carIcon from './img/car.png';
import latLongData from './LatLongData/LatLongData.json';
import InfoDialog from './InfoDialog/InfoDialog';

class MapView extends Component {

    state = {
        latLongDataLocal: [],
        currentIndex: 0,
        speed: 0,
        currentLatLong: null,
        intervalId:null,
        isInfoWindowVisible:false
    }

    componentDidUpdate(){
        if(this.props.isStarted && this.state.intervalId==null){
            this.createInterval();
        }
        else if(!this.props.isStarted && this.state.intervalId){
            clearInterval(this.state.intervalId);
            this.setState({intervalId:null});
            // this.createInterval();
        }
    }

    createInterval=()=>{
        let j=this.state.currentIndex;
        let data = latLongData.map(x => {
            return { lat: x.loc.coordinates[0], lng: x.loc.coordinates[1] }
        });
        let inter=setInterval(() => {
            let updData = [...this.state.latLongDataLocal];
            updData.push(data[j]);
            console.log(updData);
            j++;
            this.setState({ latLongDataLocal: updData, hd: latLongData[j].hd, currentLatLong: data[j], currentIndex:j });
            if (!this.props.isStarted) {
                clearInterval(inter);
            }
        }, 1000)
        this.setState({intervalId:inter});
    }

    markerClickHandler=()=>{
        this.setState({isInfoWindowVisible:!this.state.isInfoWindowVisible});
    }

    infoClickHandler=()=>{
        this.setState({isInfoWindowVisible:false});
    }

    render() {
        let infoWindow = (
            <InfoWindow visible={this.state.isInfoWindowVisible}
                position={this.state.currentLatLong}>
                <InfoDialog click={this.infoClickHandler}
                vhNum={latLongData[this.state.currentIndex].vehicle_id}
                speed={latLongData[this.state.currentIndex].sp}
                date={latLongData[this.state.currentIndex].timestamp}/>
            </InfoWindow>
        );
        return (
            <Map
                google={this.props.google}
                zoom={13}
                initialCenter={{ lat: 15.528818333333334, lng: 74.90577333333333 }}
                center={this.state.currentLatLong}
            >
                <Marker onClick={this.markerClickHandler} options={{
                    icon: {
                        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        scale: 6,
                        fillColor: 'red',
                        fillOpacity: 0.8,
                        strokeWeight: 2,
                        rotation: this.state.hd,
                    },
                }}
                    position={this.state.currentLatLong}
                />
                {infoWindow}
                <Polyline
                    path={this.state.latLongDataLocal}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={2} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'ENTER_API_KEY'
})(MapView);