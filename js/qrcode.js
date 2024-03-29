var opts = {
	continuous: true,
	video: document.getElementById('preview'),
	facingMode: 'environment',
	mirror: false,
	captureImage: false,
	backgroundScan: true,
	refractoryPeriod: 5000,
	scanPeriod: 1,
}

var scanner = new Instascan.Scanner(opts)

let isActive = false

function switchCamera() {
	if (isActive) {
		scanner.stop()
		document.getElementById('preview').style.display = 'none'
		isActive = false
		document.getElementById('CameraButton').textContent = 'Turn on camera'
	} else {
		//getLocation()
		Instascan.Camera.getCameras().then(function (cameras) {
			let backCam = cameras.find(function (camera) {
				return camera.name.indexOf('back') !== -1
			})
			if (backCam) {
				scanner.start(backCam)
				isActive = true
				document.getElementById('preview').style.display = 'block'
				document.getElementById('CameraButton').textContent = 'Turn off camera'
			}
		})
	}
}

document.getElementById('CameraButton').addEventListener('click', switchCamera)

scanner.addListener('scan', function (content) {
	alert(content)
})
