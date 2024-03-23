function getQuestion(sessionID) {
	let url = 'https://codecyprus.org/th/api/question?session=' + sessionID
	fetch(url)
		.then(response => response.json())
		.then(jsonObject => {
			console.log(jsonObject)
			document.getElementById('userInput').style.display = 'none'
			SeenQuestion.style.display = 'block'
			let html = ''
			switch (jsonObject.questionType) {
				case 'BOOLEAN':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please select true or false:</li>`
					html += `<button class="PersonInfoPanel trueButton">True</button>`
					html += `<button class="PersonInfoPanel falseButton">False</button>`
					break
				case 'INTEGER':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please enter an integer answer:</li>`
					html +=
						'<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
					html +=
						'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
					break
				case 'NUMERIC':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please enter a numeric answer:</li>`
					html +=
						'<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
					html +=
						'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
					break
				case 'MCQ':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please select one of the following options:</li>`
					html += `<button class="PersonInfoPanel mcqOption" value="A">A</button>`
					html += `<button class="PersonInfoPanel mcqOption" value="B">B</button>`
					html += `<button class="PersonInfoPanel mcqOption" value="C">C</button>`
					html += `<button class="PersonInfoPanel mcqOption" value="D">D</button>`
					break
				case 'TEXT':
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					html += `<li class="PersonInfoPanel">Please enter a single word answer:</li>`
					html +=
						'<input class="PersonInfoPanel" id="PlayerAnswer" type="text"/>'
					html +=
						'<input class="PersonInfoPanel" id="SubmitButton" type="button" value="Submit" />'
					break
				default:
					html += `<li class="PersonInfoPanel">${jsonObject.questionText}</li>`
					break
			}
			SeenQuestion.innerHTML = html
		})

	document.addEventListener('click', function (event) {
		if (event.target && event.target.id === 'SubmitButton') {
			submitAnswer()
		} else if (event.target.classList.contains('trueButton')) {
			submitAnswer(true)
		} else if (event.target.classList.contains('falseButton')) {
			submitAnswer(false)
		} else if (event.target.classList.contains('mcqOption')) {
			let mcqAnswer = event.target.getAttribute('value')
			submitAnswer(null, mcqAnswer)
		}
	})
}

function submitAnswer(booleanAnswer = null, mcqAnswer = null) {
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
			getQuestion()
		})
		.catch(error => {
			console.error('Error submitting answer:', error)
			getQuestion() 
		})
}

