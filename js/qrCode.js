


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

document
	.getElementById('SwitchCameraButton')
	.addEventListener('click', stopCamera)

document.getElementById('CameraButton').addEventListener('click', function () {
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

scanner.addListener('scan', function (content) {
	console.log(content)
	document.getElementById('content').innerHTML = content
})
