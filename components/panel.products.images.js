import { useState, useEffect, memo } from 'react';
import IconDelete from '../assets/logos/icon-garbage.svg';
import { storage } from '../services/config';
import { rnd } from '~/effects/mask';

const ProductImages = ({ id, pics, setPics, slug }) => {
	const [msg, setMsg] = useState({
		active: false,
		type: '',
		message: '',
	});
	const storageRef = storage.ref();

	// useEffect(() => {
	// 	slug && !pics[0] && console.log(slug);
	// }, []);

	// useEffect(() => {
	// 	slug && loadImages();
	// }, []);

	// function loadImages() {
	// 	const imagesRef = storageRef.child(`/${slug}`);
	// 	imagesRef.listAll().then((res) => {
	// 		res.items.forEach((resItem) => {
	// 			resItem.getDownloadURL().then((url) => {
	// 				setImages((oldArray) => [...oldArray, url]); // This line has changed!
	// 			});
	// 		});
	// 	});
	// }

	const removeImage = (name) => {
		let img = pics.filter((pic) => pic.name !== name);
		setPics(img);
		// console.log(name);
		// storageRef
		// 	.child(`/${slug}/${name}`)
		// 	.delete()
		// 	.then(function () {

		// 	})
		// 	.catch(function (error) {
		// 		console.log('deu ruim');
		// 	});
	};

	const handleFireBaseUpload = (e) => {
		const image = e.target.files[0];
		console.log('start of upload');
		// async magic goes here...
		if (image === '') {
			console.error(`not an image, the image file is a ${typeof image}`);
		}
		const uploadTask = storage.ref(`/${slug}/${image.name}`).put(image);

		//initiates the firebase side uploading
		uploadTask.on(
			'state_changed',
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot);
			},
			(err) => {
				//catches the errors
				console.log(err);
			},
			() => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storageRef
					.child(`/${slug}/${image.name}`)
					.getDownloadURL()
					.then((fireBaseUrl) => {
						setPics((oldArray) => [
							...oldArray,
							{ id: rnd(), name: image.name, url: fireBaseUrl },
						]);
					});
			}
		);
	};

	const setFirst = (id) => {
		let images = pics;
		images = images.reduce((acc, element) => {
			if (element.id === id) {
				return [element, ...acc];
			}
			return [...acc, element];
		}, []);
		setPics(images);
	};

	return (
		<>
			<div className="product__images">
				{msg.active && (
					<div className={`image__msg image__msg--${msg.type}`}>
						{msg.message}
					</div>
				)}
				{pics.map((img, i) => (
					<div
						key={i}
						className="image"
						style={{ backgroundImage: `url(${img.url})` }}
					>
						<button
							className={
								i === 0
									? 'image__primary image__primary--selected'
									: 'image__primary'
							}
							onClick={() => setFirst(img.id)}
						>
							{/* <span>{i + 1}</span> */}
						</button>
						<button
							className="image__delete"
							onClick={() => removeImage(img.name)}
						>
							<IconDelete />
						</button>
					</div>
				))}

				<input
					type="file"
					name="description"
					className="hidden"
					onChange={handleFireBaseUpload}
					id={`file${id}`}
				/>
				{pics.length <= 2 && (
					<label
						className="image__add"
						htmlFor={`file${id}`}
						onClick={() =>
							setMsg({
								active: false,
								type: '',
								message: '',
							})
						}
					></label>
				)}
			</div>
		</>
	);
};

export default memo(ProductImages);
