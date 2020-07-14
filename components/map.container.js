import { useState, useEffect } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {
	const { google } = props;
	const service = new google.maps.DistanceMatrixService();
	useEffect(() => {
		props.state.visible &&
			service.getDistanceMatrix(
				{
					origins: [props.state.currentAddress],
					destinations: [props.state.destination],
					travelMode: 'DRIVING',
					unitSystem: google.maps.UnitSystem.METRIC,
					avoidHighways: false,
					avoidTolls: false,
				},
				(response, status) => {
					if (status !== 'OK') {
						alert('Error was: ' + status);
					} else {
						props.setDistance(response.rows[0].elements[0]);
						props.setState({
							...props.state,
							visible: false,
						});
					}
				}
			);
	}, [props.state.visible]);

	return <div></div>;
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCl-OZndF-w6neMJI1zauQ8v_umrIIGKcY',
})(MapContainer);
