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
				scanner.start(cameras[0])
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
	alert(content)
})*/

