/*var opts = {
	continuous: true,
	video: document.getElementById('preview'),
	captureImage: false,
	backgroundScan: true,
	refractoryPeriod: 5000,
	scanPeriod: 1,
}

var scanner = new Instascan.Scanner(opts)

let isActive = false
let currentCameraIndex = 0
let cameras = []

function stopCamera() {
	if (isActive) {
		scanner.stop()




		document.getElementById('preview').style.display = 'none'
		isActive = false
	}
}

function startCamera() {
	if (!isActive && cameras.length > 0) {
		var camera = cameras[currentCameraIndex]
		scanner.start(camera)




		document.getElementById('preview').style.display = 'block'
		isActive = true
	}
}

function switchCamera() {
	currentCameraIndex = (currentCameraIndex + 1) % cameras.length
}

document.getElementById('CameraButton').addEventListener('click', function () {
	//stopCamera()
	if (!isActive) {
		Instascan.Camera.getCameras()
			.then(function (availableCameras) {
				cameras = availableCameras
				if (cameras.length > 0) {
					startCamera()
				} else {
					console.error('No cameras found.')
					alert('No cameras found.')
				}
			})
			.catch(function (err) {
				console.error('Error accessing camera:', err)
				alert('Error accessing camera')
			})
	}
})

document
	.getElementById('SwitchCameraButton')
	.addEventListener('click', function () {
		switchCamera()
	})

scanner.addListener('scan', function (content) {
	console.log(content)
	document.getElementById('content').innerHTML = content
})*/


/*let scanner = new Instascan.Scanner({
	video: document.getElementById('preview'),
})
scanner.addListener('scan', function (content) {
	console.log(content)
})
Instascan.Camera.getCameras()
	.then(function (cameras) {
		if (cameras.length > 0) {
			scanner.start(cameras[0])
		} else {
			console.error('No cameras found.')
		}
	})
	.catch(function (e) {
		console.error(e)
	})*/



  var opts = {
		continuous: true,
		video: document.getElementById('preview'),
		captureImage: false,
		backgroundScan: true,
		refractoryPeriod: 5000,
		scanPeriod: 1,
	}

	var scanner = new Instascan.Scanner(opts)

	scanner.addListener('scan', function (content) {
		alert(content)
	})

	document
		.getElementById('CameraButton')
		.addEventListener('click', function () {
			Instascan.Camera.getCameras()
				.then(function (cameras) {
					if (cameras.length > 0) {
						scanner.start(cameras[0])
					} else {
						console.error('No cameras found.')
					}
				})
				.catch(function (err) {
					console.error('Error accessing camera:', err)
					alert('Error accessing camera')
				})
		})

