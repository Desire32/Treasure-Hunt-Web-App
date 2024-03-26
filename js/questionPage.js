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
		switch (jsonObject.questionType) {
			case 'BOOLEAN':
				html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
				html += `<li class="PersonInfoPanel">Please select true or false:</li>`
				html += `<button class="PersonInfoPanel trueButton">True</button>`
				html += `<button class="PersonInfoPanel falseButton">False</button>`
				if (jsonObject.canBeSkipped) {
					html += `<button class="PersonInfoPanel skipButton" value="SKIP">SKIP</button>`
				}
				break
			case 'INTEGER':
				html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
				html += `<li class="PersonInfoPanel">Please enter an integer answer:</li>`
				html += '<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
				html +=
					'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
				if (jsonObject.canBeSkipped) {
					html += `<button class="PersonInfoPanel skipButton" value="SKIP">SKIP</button>`
				}
				break
			case 'NUMERIC':
				html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
				html += `<li class="PersonInfoPanel">Please enter a numeric answer:</li>`
				html += '<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
				html +=
					'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
				if (jsonObject.canBeSkipped) {
					html += `<button class="PersonInfoPanel skipButton" value="SKIP">SKIP</button>`
				}
				break
			case 'MCQ':
				html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
				html += `<li class="PersonInfoPanel">Please select one of the following options:</li>`
				html += `<button class="PersonInfoPanel mcqOption" value="A">A</button>`
				html += `<button class="PersonInfoPanel mcqOption" value="B">B</button>`
				html += `<button class="PersonInfoPanel mcqOption" value="C">C</button>`
				html += `<button class="PersonInfoPanel mcqOption" value="D">D</button>`
				if (jsonObject.canBeSkipped) {
					html += `<button class="PersonInfoPanel skipButton" value="SKIP">SKIP</button>`
				}
				break
			case 'TEXT':
				html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
				html += `<li class="PersonInfoPanel">Please enter a single word answer:</li>`
				html += '<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
				html +=
					'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
				if (jsonObject.canBeSkipped) {
					html += `<button class="PersonInfoPanel skipButton" value="SKIP">SKIP</button>`
				}
				break
			default:
				break
		}
	}
	html += `</div>`
	return html
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

async function loadScore(sessionID) {
	let scoreURL = 'https://codecyprus.org/th/api/score?session=' + sessionID
	let scoreElement = document.getElementById('score')

	const response = await fetch(scoreURL)
	const jsonObject = await response.json()
	if (jsonObject.status === 'OK') {
		scoreElement.textContent = 'Score: ' + jsonObject.score
	}
}

start().then(sessionID => {
	loadScore(sessionID)
})

async function getLocation(sessionID) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			showPosition(position, sessionID)
		})
	}
}
