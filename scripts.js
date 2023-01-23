const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((localMediaStream) => {
			console.log(localMediaStream);
			video.srcObject = localMediaStream; // video object needs a URL. This convers media stream to URL
			video.play();
		})
		.catch((err) => {
			console.error(`Oh no!`, err);
		});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height; // make canvas the same size as the video instream

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
	}, 16); // runs function every 16ms. return so that you can call clear interval if you ever need to stop it
}

function takePhoto() {
	//camera sound
	snap.currentTime = 0;
	snap.play();

	//take photo from canvas
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'webcam photo');
	link.innerHTML = `<img src="${data}" alt = "webcam photo" />`;
	strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
