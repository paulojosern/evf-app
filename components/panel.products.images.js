import { useState, useEffect, memo } from 'react';
import { usePanelContext } from '~/context/panel.context';
import IconDelete from '../assets/logos/icon-garbage.svg';
import { storage } from '../services/config';

const ProductImages = ({ id, slug, pics, setPics }) => {
	const [msg, setMsg] = useState({
		active: false,
		type: '',
		message: '',
	});
	const { showLoading } = usePanelContext();
	const storageRef = storage.ref();

	useEffect(() => {
		slug && loadImages();
	}, [slug]);

	const loadImages = () => {
		const imagesRef = storageRef.child(`/${slug}`);
		if (pics.length > 0) return;
		imagesRef.listAll().then((res) => {
			res.items.forEach((resItem, i) => {
				resItem.getDownloadURL().then((url) => {
					setPics((oldArray) => [...oldArray, url]);
				});
			});
		});
	};

	const removeImage = (url) => {
		showLoading(true);
		storage
			.refFromURL(url)
			.delete()
			.then(() => {
				let img = images.filter((pic) => pic !== url);
				setPics(img);
				showLoading(false);
			})
			.catch((err) => console.error(err));
	};

	const handleFireBaseUpload = (e) => {
		const image = e.target.files[0];
		console.log('start of upload');
		showLoading(true);
		// async magic goes here...
		if (image === '') {
			console.error(`not an image, the image file is a ${typeof image}`);
		}
		const uploadTask = storage.ref(`/${slug}/${image.name}`).put(image);

		uploadTask.on(
			'state_changed',
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log(snapShot);
			},
			(err) => {
				//catches the errors
				console.log('erro????', err);
			},
			() => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storageRef
					.child(`/${slug}/${image.name}`)
					.getDownloadURL()
					.then((fireBaseUrl) => {
						setPics((oldArray) => [...oldArray, fireBaseUrl]);
						showLoading(false);
					});
			}
		);
	};

	const setFirst = (url) => {
		let img = pics;
		img = img.reduce((acc, element) => {
			if (element === url) {
				return [element, ...acc];
			}
			return [...acc, element];
		}, []);
		setPics(img);
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
						style={{ backgroundImage: `url(${img})` }}
					>
						<button
							className={
								i === 0
									? 'image__primary image__primary--selected'
									: 'image__primary'
							}
							onClick={() => setFirst(img)}
						>
							{/* <span>{i + 1}</span> */}
						</button>
						<button className="image__delete" onClick={() => removeImage(img)}>
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
