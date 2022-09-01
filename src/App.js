import React, { useEffect, useState } from "react";
import "./App.css";
import { createApi } from "unsplash-js";

const api = createApi({
	accessKey: "896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043",
});

const CreateModule = ({ photo, set }) => {
	return (
		<div className='modulePhoto'>
			<img
				onClick={() => {
					set(false);
				}}
				src={photo.urls.full}
				alt='one'></img>
		</div>
	);
};

function App() {
	const [data, setPhotosResponse] = useState(null);
	const [isModule, setIsModule] = useState(false);
	const [clickedPhoto, setPhoto] = useState();

	useEffect(() => {
		api.search
			.getPhotos({ query: "all" })
			.then((result) => {
				setPhotosResponse(result);
			})
			.catch(() => {
				console.log("something went wrong!");
			});
	}, [data]);

	return (
		<div className='App'>
			{isModule ? <CreateModule photo={clickedPhoto} set={setIsModule}></CreateModule> : <div></div>}
			<div className='header'></div>
			<div className='photos'>
				{data !== null ? (
					data.response.results.map((photo, index) => (
						<div className='photo' key={index + 1}>
							{" "}
							<div className='namePhoto'>{photo.alt_description}</div>
							<img
								onClick={() => {
									setIsModule(true);
									setPhoto(photo);
								}}
								alt='aa'
								src={photo.urls.full}></img>{" "}
							<div className='authorPhoto'>
								{photo.user.first_name +
									" " +
									(photo.user.last_name !== null ? photo.user.last_name : "")}
							</div>
						</div>
					))
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}

export default App;
