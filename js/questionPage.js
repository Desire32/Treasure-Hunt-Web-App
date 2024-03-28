async function getQuestion(sessionID) {
	let questionURL =
		'https://codecyprus.org/th/api/question?session=' + sessionID
	const response = await fetch(questionURL)
	const jsonObject = await response.json()
	if (jsonObject) {
		document.getElementById('userInput').style.display = 'none'
		elements.SeenQuestion.style.display = 'block'
		elements.SeenQuestion.innerHTML = generateQuestionHTML(jsonObject)
	}
}

function generateQuestionHTML(jsonObject) {
	let html = ''
	html += `<div class="questionContainer">`
	if (jsonObject.currentQuestionIndex < jsonObject.numOfQuestions) {
		html += `<h3 style="font-size: 2rem;">Question ${
			jsonObject.currentQuestionIndex + 1
		}</h3>`
		html += `<li class="PersonInfoPanel2">${jsonObject.questionText}</li>`
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
		if (jsonObject.canBeSkipped) {
			html += `<button class="PersonInfoPanel skipButton" value="SKIP">SKIP</button>`
		}
	} else {
		html += `<li class="PersonInfoPanel2">Congratulations! Game over</li>`
		html += `<a class="PersonInfoPanel2" id="showLeaderboardButton" href="leaderboard.html">Leaderboard</a>`
	}
	if (jsonObject.requiresLocation) {
		let latitude = getCookie('latitude')
		let longitude = getCookie('longitude')
		if (latitude && longitude) {
			html += `<li class="PersonInfoPanel2">Your current location is: Latitude ${latitude}, Longitude ${longitude}</li>`
		} else {
			html += `<li class="PersonInfoPanel">This question requires your location.</li>`
		}
	}
	html += `</div>`
	return html
}

function isNumberKey(evt) {
	var charCode = evt.which ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false
	return true
}

function checkInputValue() {
	let inputValue = document.getElementById('PlayerAnswer').value.trim()
	if (inputValue === '') {
		alert('Please enter a value for this field.')
	}
}

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
	}
})

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

async function getLocation(sessionID) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			showPosition(position, sessionID)
		})
	}
}

