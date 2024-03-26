const elements = {
	SeenQuestion: document.getElementById('questionField'),
	treasureHuntsListElement: document.getElementById('treasureHunts'),
	playerNameInput: document.getElementById('playerName'),
	nameButton: document.getElementById('nameButton'),
	appName: document.getElementById('appName'),
	userInput: document.querySelector('.userInput'),
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
						//await start()
					}
				}
			)
		})
}

async function start() {
	let uuid = getCookie('uuid')

	if (!addWordToStorage()) {
		return
	}

	let url =
		'https://codecyprus.org/th/api/start' +
		'?player=' +
		playerName +
		'&app=ComputerLegendsApp' +
		'&treasure-hunt-id=' +
		uuid

	let response = await fetch(url)
	let jsonObject = await response.json()
	console.log(jsonObject)
	let sessionID = jsonObject.session
	setCookie('sessionID', sessionID, 30)
	return sessionID
}

elements.nameButton.addEventListener('click', async function () {
	let sessionID = await start()
	if (sessionID) {
		getQuestion(sessionID)
		loadScore(sessionID)
		document.getElementById('score').style.display = 'block'
	}
})

/*start().then(sessionID => {
	getQuestion(sessionID)
})*/

function addWordToStorage() {
	let playerName = elements.playerNameInput.value.trim()
	if (playerName !== '') {
		try {
			let storedWords = JSON.parse(getCookie('storedWords')) || []
			if (storedWords.includes(playerName)) {
				alert('Such name has already been used before, try again')
				return false
			}
			if (playerName === '' || /^\d+$/.test(playerName) || playerName.length > 50) {
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
		}
	}
	return true
}

async function loadScore(sessionID) {
	let scoreURL = 'https://codecyprus.org/th/api/score?session=' + sessionID
	let scoreElement = document.getElementById('score')

	try {
		let response = await fetch(scoreURL)
		let jsonObject = await response.json()
		console.log(jsonObject)
		scoreElement.textContent = `Score: ${jsonObject.score}`
	} catch (error) {
		console.error('Error fetching score:', error)
	}
}
