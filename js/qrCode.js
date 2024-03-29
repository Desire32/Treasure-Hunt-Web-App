


/*var opts = {
	continuous: true,
	video: document.getElementById('preview'),
	captureImage: false,
	backgroundScan: true,
	refractoryPeriod: 5000,
	scanPeriod: 1,
}

var scanner = new Instascan.Scanner(opts)


document.getElementById('CameraButton').addEventListener('click', function () {
	Instascan.Camera.getCameras()
		.then(function (cameras) {
			if (cameras.length > 0) {
				scanner.start(cameras[currentCameraIndex])
			} else {
				console.error('No cameras found.')
				alert('No cameras found.')
			}
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
var currentCameraIndex = 0
var cameras = []

Instascan.Camera.getCameras()
	.then(function (cameras) {
		if (cameras.length > 0) {
			var selectedCam = cameras[0]
			$.each(cameras, (i, c) => {
				if (c.name.indexOf('back') != -1) {
					selectedCam = c
					return false
				}
			})

			scanner.start(selectedCam)
		} else {
			console.error('No cameras found.')
		}
	})
	.catch(function (e) {
		console.error(e)
	})
