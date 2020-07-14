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
						const res = response.rows[0].elements[0];
						props.setDistance(res);
						props.setState({
							...props.state,
							visible: false,
							recused: res.distance.value > 5000 ? true : false,
						});
						res.distance.value > 5000 && (props.number.current.value = '');
					}
				}
			);
	}, [props.state.visible]);

	return <div></div>;
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCl-OZndF-w6neMJI1zauQ8v_umrIIGKcY',
})(MapContainer);
