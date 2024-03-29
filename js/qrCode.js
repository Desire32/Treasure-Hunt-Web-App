
  var opts = {
		continuous: true,
		video: document.getElementById('preview'),
		captureImage: false,
		backgroundScan: true,
		refractoryPeriod: 5000,
		scanPeriod: 1,
	}

	var scanner = new Instascan.Scanner(opts)


	document
		.getElementById('CameraButton')
		.addEventListener('click', function () {
			Instascan.Camera.getCameras()
				.then(function (cameras) {
					if (cameras.length > 0) {
						stopCamera()
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

		document
			.getElementById('StopCameraButton')
			.addEventListener('click', stopCamera)


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

		scanner.addListener('scan', function (content) {
			alert(content)
		})


