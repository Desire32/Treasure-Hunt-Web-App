

// fetching a question from the server using the provided sessionID
async function getQuestion(sessionID) {
	let questionURL =
		'https://codecyprus.org/th/api/question?session=' + sessionID
	const response = await fetch(questionURL)
	const jsonObject = await response.json()
	if (jsonObject) {
		document.getElementById('userInput').style.display = 'none'
		elements.SeenQuestion.style.display = 'block'
		elements.SeenQuestion.innerHTML = generateQuestionHTML(jsonObject)
		updateProgressBar(jsonObject.currentQuestionIndex)
	}
	if (jsonObject.status === 'ERROR') {
		if (jsonObject.errorMessages && jsonObject.errorMessages.length > 0) {
			for (let i = 0; i < jsonObject.errorMessages.length; i++) {
				alert(jsonObject.errorMessages[i])
			}
		}
		return false
	}
}

// creating a kind of road map for the application, which in a convenient form shows the questions, on which question and how much is left until the end
function updateProgressBar(currentQuestionIndex) {
	for (let i = 1; i <= 6; i++) {
		let point = document.getElementById(`point-${i}`)
		if (i <= currentQuestionIndex) {
			point.style.backgroundColor = 'green'
		} else {
			point.style.backgroundColor = '#ddd'
		}
		point.dataset.number = i
	}
	let line = document.querySelector('.progress-bar-line')
	line.style.width = `${(currentQuestionIndex / 6) * 48}%`
	line.style.backgroundColor = 'gray'
}


// the generation of the question itself from the database, which reads the data, depending on the type of question, location, pass, qr code, and displays the corresponding data
function generateQuestionHTML(jsonObject) {
	let html = ''
	html += `<div class="questionContainer">`
	if (jsonObject.currentQuestionIndex < jsonObject.numOfQuestions) {
		html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
		switch (jsonObject.questionType) {
			case 'BOOLEAN':
				html += `<button class="PersonInfoPanel trueButton">True</button>`
				html += `<button class="PersonInfoPanel falseButton">False</button>`
				break
			case 'INTEGER':
				html +=
					'<input class="PersonInfoPanel" id="PlayerAnswer" type="text" onkeypress="return isNumberKey(event)"/>'
				html +=
					'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" onclick="checkInputValue()"/>'
				break
			case 'NUMERIC':
				html +=
					'<input class="PersonInfoPanel" id="PlayerAnswer" type="text" onkeypress="return isNumberKey(event)"/>'
				html +=
					'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" onclick="checkInputValue()"/>'
				break
			case 'MCQ':
				html += `<button class="PersonInfoPanel mcqOption" value="A">A</button>`
				html += `<button class="PersonInfoPanel mcqOption" value="B">B</button>`
				html += `<button class="PersonInfoPanel mcqOption" value="C">C</button>`
				html += `<button class="PersonInfoPanel mcqOption" value="D">D</button>`
				break
			case 'TEXT':
				html +=
					'<input class="PersonInfoPanel" id="PlayerAnswer" type="text" pattern="^[a-zA-Zs]*$"/>'
				html +=
					'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" onclick="checkInputValue()"/>'
				break
			default:
				break
		}
		if (
			jsonObject.canBeSkipped &&
			jsonObject.currentQuestionIndex < jsonObject.numOfQuestions - 1
		) {
			html += `<button class="PersonInfoPanel skipButton" value="SKIP">SKIP</button>`
		}
	} else {
		html += `<li class="PersonInfoPanel">Congratulations! Game over</li>`
		html += `<a class="PersonInfoPanel" id="showLeaderboardButton" href="leaderboard.html">Leaderboard</a>`
		html += `<button class="PersonInfoPanel" id="playAgainButton">Play Again</button>`
	}
	if (jsonObject.requiresLocation) {
		elements.QrCodeElement.style.display = 'block'
		elements.disableButtonElement.style.display = 'block'
		let latitude = getCookie('latitude')
		let longitude = getCookie('longitude')
		if (latitude && longitude) {
			html += `<li class="PersonInfoPanel">Your current location is: Latitude ${latitude}, Longitude ${longitude}</li>`
		} else {
			html += `<li class="PersonInfoPanel">This question requires your location.</li>`
		}
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
		})
		
		elements.disableButtonElement.addEventListener('click', function () {
			scanner.stop()
		})
	} else {
		elements.QrCodeElement.style.display = 'none'
		elements.disableButtonElement.style.display = 'none'
	}
	html += `</div>`
	return html
}

// character checking to prevent the user from entering inappropriate characters
function isNumberKey(evt) {
	var charCode = evt.which ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false
	return true
}

// checking the field to ensure that the user does not enter an empty character
function checkInputValue() {
	let inputValue = document.getElementById('PlayerAnswer').value.trim()
	if (inputValue === '') {
		alert('Please enter a value for this field.')
		return false
	}
	return true
}

// click handler depending on the button pressed, loads a specific function
document.addEventListener('click', async function (event) {
	let sessionID = getCookie('sessionID')
	if (event.target && event.target.id === 'SubmitButton') {
		await submitAnswer(null, null, sessionID)
	} else if (event.target.classList.contains('trueButton')) {
		await submitAnswer(true, null, sessionID)
	} else if (event.target.classList.contains('falseButton')) {
		await submitAnswer(false, null, sessionID)
	} else if (event.target.classList.contains('mcqOption')) {
		let mcqAnswer = event.target.getAttribute('value')
		await submitAnswer(null, mcqAnswer, sessionID)
	} else if (event.target.classList.contains('skipButton')) {
		await skipQuestion(sessionID)
	} else if (event.target && event.target.id === 'playAgainButton') {
		setCookie('sessionID', '', -1)
		await fetchTreasureHunts()
		window.location.assign(window.location.href)
	}
})

// submits an answer to the server
async function submitAnswer(booleanAnswer = null, mcqAnswer = null, sessionID) {
	let answerInput
	if (booleanAnswer !== null) {
		answerInput = booleanAnswer.toString()
	} else if (mcqAnswer !== null) {
		answerInput = mcqAnswer
	} else {
		answerInput = document.getElementById('PlayerAnswer').value.trim()
	}

	let answerURL =
		'https://codecyprus.org/th/api/answer?session=' +
		sessionID +
		'&answer=' +
		encodeURIComponent(answerInput)

	const response = await fetch(answerURL)
	const jsonObject = await response.json()
	console.log(jsonObject)
	if (jsonObject) {
		await getQuestion(sessionID)
		await loadScore(sessionID)
	}
}

// skips a question
async function skipQuestion(sessionID) {
	let skipURL = 'https://codecyprus.org/th/api/skip?session=' + sessionID

	const response = await fetch(skipURL)
	const jsonObject = await response.json()
	console.log(jsonObject)
	if (jsonObject.status === 'OK' && jsonObject.completed === false) {
		await getQuestion(sessionID)
		await loadScore(sessionID)
	}
}

// gets the user's location
async function getLocation(sessionID) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			showPosition(position, sessionID)
		})
	}
}

