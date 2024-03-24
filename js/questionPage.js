function getQuestion(sessionID) {
	let url = 'https://codecyprus.org/th/api/question?session=' + sessionID
	fetch(url)
		.then(response => response.json())
		.then(jsonObject => {
			console.log(jsonObject)
			if (jsonObject.status === 'OK') {
				document.getElementById('userInput').style.display = 'none'
				SeenQuestion.style.display = 'block'
				SeenQuestion.innerHTML = generateQuestionHTML(jsonObject)
			}
		})
}

function generateQuestionHTML(jsonObject) {
	let html = '';
	html += `<div class="questionContainer">`;
	if (jsonObject.currentQuestionIndex < 6) {
		html += `<h3>Question ${jsonObject.currentQuestionIndex + 1}</h3>`;
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
	html += `</div>`;
	return html;
}

document.addEventListener('click', function (event) {
	let sessionID = localStorage.getItem('sessionID')
	if (event.target && event.target.id === 'SubmitButton') {
		submitAnswer(null, null, sessionID)
	} else if (event.target.classList.contains('trueButton')) {
		submitAnswer(true, null, sessionID)
	} else if (event.target.classList.contains('falseButton')) {
		submitAnswer(false, null, sessionID)
	} else if (event.target.classList.contains('mcqOption')) {
		let mcqAnswer = event.target.getAttribute('value')
		submitAnswer(null, mcqAnswer, sessionID)
	} else if (event.target.classList.contains('skipButton')) {
		skipQuestion(sessionID)
	}
})

function submitAnswer(booleanAnswer = null, mcqAnswer = null, sessionID) {
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

	fetch(answerURL)
		.then(response => response.json())
		.then(jsonObject => {
			console.log(jsonObject)
				if (jsonObject.status === 'OK') {
						getQuestion(sessionID)
				}
		})
}

function skipQuestion(sessionID) {
	let skipURL = 'https://codecyprus.org/th/api/skip?session=' + sessionID

	fetch(skipURL)
		.then(response => response.json())
		.then(jsonObject => {
			console.log(jsonObject)
			if (jsonObject.status === 'OK' && jsonObject.completed === false) {
				getQuestion(sessionID)
			} else {
				console.error('Failed to skip question')
			}
		})
}

function loadScore(sessionID) {
	let scoreURL = 'https://codecyprus.org/th/api/score?session=' + sessionID
	let scoreElement = document.getElementById('score')

	fetch(scoreURL)
		.then(response => response.json())
		.then(jsonObject => {
			console.log(jsonObject)
			if (jsonObject.status === 'OK') {
				scoreElement.textContent = 'Score: ' + jsonObject.score
			}
		})
}

start().then(sessionID => {
	loadScore(sessionID)
})
