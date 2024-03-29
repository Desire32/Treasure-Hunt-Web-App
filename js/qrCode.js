
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

