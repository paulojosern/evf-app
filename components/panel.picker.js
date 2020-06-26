import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
	constructor(props) {
		super(props);
		// console.log(props);
		this.state = {
			displayColorPicker: false,
			color: {
				r: this.props.color !== undefined && this.props.color.r,
				g: this.props.color && this.props.color.g,
				b: this.props.color && this.props.color.b,
				a: this.props.color && this.props.color.a,
			},
		};
	}

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker });
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false });
	};

	handleChange = (color) => {
		this.setState({ color: color.rgb });
		// console.log(color.rgb);
		this.props.setValues({
			...this.props.values,
			colors: {
				...this.props.values.colors,
				[this.props
					.colorCurrent]: `${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a}`,
			},
		});
		this.props.setColors({
			...this.props.values.colors,
			[this.props
				.colorCurrent]: `${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a}`,
		});
	};

	render() {
		const styles = reactCSS({
			default: {
				color: {
					width: '36px',
					height: '14px',
					borderRadius: '2px',
					background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
				},
				swatch: {
					padding: '5px',
					margin: '5px 10px 5px 0',
					background: '#fff',
					borderRadius: '1px',
					boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer',
				},
				popover: {
					position: 'absolute',
				},
				cover: {
					position: 'fixed',
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px',
				},
			},
		});

		return (
			<div>
				<div style={styles.swatch} onClick={this.handleClick}>
					<div style={styles.color} />
				</div>
				{this.state.displayColorPicker ? (
					<div style={styles.popover}>
						<div style={styles.cover} onClick={this.handleClose} />
						<SketchPicker
							color={this.state.color}
							onChange={this.handleChange}
						/>
					</div>
				) : null}
			</div>
		);
	}
}

export default ColorPicker;
