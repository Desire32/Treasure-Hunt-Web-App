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
		Instascan.Camera.getCameras()
			.then(function (cameras) {
				if (cameras.length > 0) {
					scanner.start(cameras[0])
					document.getElementById('preview').style.display = 'block'
					isActive = true
				} else {
					alert('Camera is not found')
				}
			})
			.catch(function (err) {
				console.error('Error accessing camera:', err)
				alert('Error accessing camera')
			})
	}
}

document.getElementById('qrCode').addEventListener('click', function () {
	stopCamera()
})

document.getElementById('button').addEventListener('click', function () {
	Instascan.Camera.getCameras().then(function (cameras) {
		if (cameras.length > 0) {
			scanner.start(cameras[0])
			isActive = true
			document.getElementById('preview').style.display = 'block'
		} else {
			alert('Camera is not found')
		}
	})
})

scanner.addListener('scan', function (content) {
	console.log(content)
	document.getElementById('content').innerHTML = content
})
