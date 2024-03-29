

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

function stopCamera() {
	if (isActive) {
		scanner.stop()
		document.getElementById('preview').style.display = 'none'
		isActive = false
	} else {
		scanner.start()
		document.getElementById('preview').style.display = 'block'
		isActive = true
	}
}

document.getElementById('CameraButton').addEventListener('click', stopCamera)

document.getElementById('button').addEventListener('click', function () {
	Instascan.Camera.getCameras()
		.then(function (cameras) {
			if (cameras.length > 0) {
				scanner.start(cameras[0])
				isActive = true
				document.getElementById('preview').style.display = 'block'
			} else {
				console.error('No cameras found.')
				alert('No cameras found.')
			}
		})
		.catch(function (e) {
			console.error(e)
		})
})


})*/


var currentCameraIndex = 0
var cameras = []

function startCamera(index) {
	if (cameras.length > 0) {
		scanner.start(cameras[index])
	} else {
		console.error('No cameras found.')
		alert('No cameras found.')
	}
}

document.getElementById('CameraButton').addEventListener('click', function () {
	Instascan.Camera.getCameras()
		.then(function (cams) {
			cameras = cams
			startCamera(currentCameraIndex)
		})
		.catch(function (e) {
			console.error(e)
		})
})

document
	.getElementById('SwitchCameraButton')
	.addEventListener('click', function () {
		currentCameraIndex = (currentCameraIndex + 1) % cameras.length 
		startCamera(currentCameraIndex)
	})

scanner.addListener('scan', function (content) {
	alert(content)
})