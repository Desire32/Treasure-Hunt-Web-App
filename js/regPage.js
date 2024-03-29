
// let's collect all the variables in one place for convenience
const elements = {
	SeenQuestion: document.getElementById('questionField'),
	treasureHuntsListElement: document.getElementById('treasureHunts'),
	playerNameInput: document.getElementById('playerName'),
	nameButton: document.getElementById('nameButton'),
	userInput: document.querySelector('.userInput'),
	scoreElement: document.getElementById('score'),
  QrCodeElement: document.getElementById('CameraButton'),
	disableButtonElement: document.getElementById('disableButton')
}
// fetching treasure hunt data from a server and handling user interactions with the fetched data
fetchTreasureHunts()


//tries to get a sessionID from a cookie. If it doesn't exist, it fetches the list of treasure hunts from the server. For each treasure hunt, it creates an HTML list item and adds an event listener to it. If a treasure hunt is clicked, it checks if the treasure hunt is available (shuffled). If it is, it displays an input for the user to enter their name and starts the treasure hunt. If the treasure hunt is not available, it alerts the user
function fetchTreasureHunts() {
	let sessionID = getCookie('sessionID')

	if (!sessionID) {
		fetch('https://codecyprus.org/th/api/list')
			.then(response => response.json())
			.then(jsonObject => {
				console.log(jsonObject)
				let html = ''
				let treasureHunts = {}
				jsonObject.treasureHunts.forEach(treasureHunt => {
					html += `<li class="treasureHuntFontSize" data-uuid="${treasureHunt.uuid}">${treasureHunt.name}</li>`
					treasureHunts[treasureHunt.uuid] = treasureHunt
				})
				elements.treasureHuntsListElement.innerHTML = html
				elements.treasureHuntsListElement.addEventListener(
					'click',
					async function (event) {
						let clickedElement = event.target
						let uuid = clickedElement.getAttribute('data-uuid')
						if (treasureHunts[uuid].shuffled) {
							setCookie('uuid', uuid, 30)
							if (uuid) {
								elements.userInput.style.display = 'block'
								elements.treasureHuntsListElement.style.display = 'none'
								sessionID = await start()
								setCookie('sessionID', sessionID, 30)
							}
						} else {
							alert('This treasure hunt is unavailable')
						}
					}
				)
			})
	} else {
		// this data is loaded if session is running, so it would be live
		getQuestion(sessionID)
		loadScore(sessionID)
		elements.scoreElement.style.display = 'block'
	}
}

//responsible for starting a treasure hunt. gets the uuid of the selected treasure hunt and the player's name from an input field. If the name is valid, it sends a request to the server to start the treasure hunt. If the server responding with an 'OK' status, it sets the sessionID cookie and fetches the first question. If the server responding with an 'ERROR' status, alerts the user with the error messages. If the name is not valid, it alerts the user and does not send the request to the server
async function start() {
	let uuid = getCookie('uuid')
	let playerName = elements.playerNameInput.value.trim()

	if (playerName !== '') {
		try {
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

		let response = await fetch(url)
		let jsonObject = await response.json()
		console.log(jsonObject)
		if (jsonObject.status === 'ERROR') {
			if (jsonObject.errorMessages && jsonObject.errorMessages.length > 0) {
				for (let i = 0; i < jsonObject.errorMessages.length; i++) {
					alert(jsonObject.errorMessages[i])
				}
			}
			return false
		} else if (jsonObject.status === 'OK') {
			let sessionID = jsonObject.session
			setCookie('sessionID', sessionID, 30)
			getQuestion(sessionID)
			return sessionID
		} else {
			return false
		}
	}
}

// when the user enters a name, the account item is expanded and the game starts
elements.nameButton.addEventListener('click', async function () {
	let sessionID = await start()
	if (sessionID) {
		loadScore(sessionID)
		elements.scoreElement.style.display = 'block'
	}
})



// loading an account for the user, built-in error checker reading API requests
async function loadScore(sessionID) {
	let scoreURL = 'https://codecyprus.org/th/api/score?session=' + sessionID
	let response = await fetch(scoreURL)
	let jsonObject = await response.json()
	console.log(jsonObject)

	if (jsonObject.status === 'ERROR') {
		if (jsonObject.errorMessages && jsonObject.errorMessages.length > 0) {
			for (let i = 0; i < jsonObject.errorMessages.length; i++) {
				alert(jsonObject.errorMessages[i])
			}
		}
		return false
	}

	elements.scoreElement.textContent = `Score: ${jsonObject.score}`
}


