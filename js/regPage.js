const elements = {
	SeenQuestion: document.getElementById('questionField'),
	treasureHuntsListElement: document.getElementById('treasureHunts'),
	playerNameInput: document.getElementById('playerName'),
	nameButton: document.getElementById('nameButton'),
	userInput: document.querySelector('.userInput'),
	scoreElement: document.getElementById('score')
}

fetchTreasureHunts()

function fetchTreasureHunts() {
	fetch('https://codecyprus.org/th/api/list')
		.then(response => response.json())
		.then(jsonObject => {
			let html = ''
			jsonObject.treasureHunts.forEach(treasureHunt => {
				html += `<li class="treasureHuntFontSize" data-uuid="${treasureHunt.uuid}">${treasureHunt.name}</li>`
			})
			elements.treasureHuntsListElement.innerHTML = html
			elements.treasureHuntsListElement.addEventListener(
				'click',
				async function (event) {
					let clickedElement = event.target
					let uuid = clickedElement.getAttribute('data-uuid')
					setCookie('uuid', uuid, 30)
					if (uuid) {
						elements.userInput.style.display = 'block'
						elements.treasureHuntsListElement.style.display = 'none'
						await start()
					}
				}
			)
		})
}

async function start() {
	let uuid = getCookie('uuid')
	let playerName = elements.playerNameInput.value.trim()

	if (playerName !== '') {
		try {
			let storedWords = JSON.parse(getCookie('storedWords')) || []
			if (storedWords.includes(playerName)) {
				alert('This name is already in use, try a new one')
				return false
			}
			if (
				playerName === '' ||
				/^\d+$/.test(playerName) ||
				playerName.length > 50
			) {
				if (/^\d+$/.test(playerName)) {
					alert('Name cannot consist only of numbers.')
				} else if (playerName.length > 50) {
					alert('Name should not exceed 50 characters.')
				} else {
					alert('Please enter a valid name.')
				}
				return false
			}
			storedWords.push(playerName)
			setCookie('storedWords', JSON.stringify(storedWords), 30)
			elements.playerNameInput.value = ''
		} catch (error) {
			console.error('Reading error')
			return false
		}

		let url =
			'https://codecyprus.org/th/api/start' +
			'?player=' +
			playerName +
			'&app=ComputerLegendsApp' +
			'&treasure-hunt-id=' +
			uuid

		let urlObj = new URL(url)
		if (!urlObj.searchParams.has('app')) {
			alert(jsonObject.errorMessages[1])
			return false
		}

		let response = await fetch(url)
		let jsonObject = await response.json()
		console.log(jsonObject)
		if (jsonObject.status === 'OK') {
			let sessionID = jsonObject.session
			setCookie('sessionID', sessionID, 30)
			getQuestion(sessionID)
			return sessionID
		} else {
			return false
		}
	}
}

elements.nameButton.addEventListener('click', async function () {
	let sessionID = await start()
	if (sessionID) {
		let scoreData = await loadScore(sessionID)
		if(scoreData)
		{
			console.log(scoreData)
		}
		elements.scoreElement.style.display = 'block'
	}
})

async function loadScore(sessionID) {
	let scoreURL = 'https://codecyprus.org/th/api/score?session=' + sessionID
	let response = await fetch(scoreURL)
	let jsonObject = await response.json()
	console.log(jsonObject)
	elements.scoreElement.textContent = `Score: ${jsonObject.score}`

	if (jsonObject.completed === true) {
		const scoreData = {
			finished: jsonObject.finished,
			playerName: jsonObject.player,
			score: jsonObject.score,
		}
		return scoreData
	}
}

