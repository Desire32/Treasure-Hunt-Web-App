let SeenQuestion = document.getElementById('questionField')
let treasureHuntsListElement = document.getElementById('treasureHunts')
let playerNameInput = document.getElementById('playerName')
let nameButton = document.getElementById('nameButton')
//let sessionID = localStorage.getItem('sessionID')

fetchTreasureHunts()

function fetchTreasureHunts() {
	fetch('https://codecyprus.org/th/api/list')
		.then(response => response.json())
		.then(jsonObject => {
			let html = ''
			jsonObject.treasureHunts.forEach(treasureHunt => {
				html += `<li class="treasureHuntFontSize" data-uuid="${treasureHunt.uuid}">${treasureHunt.name}</li>`
			})
			treasureHuntsListElement.innerHTML = html

			treasureHuntsListElement.addEventListener('click', async function (event) {
				let clickedElement = event.target
				uuid = clickedElement.getAttribute('data-uuid')
				localStorage.setItem('uuid', uuid)
				if (uuid) {
					document.querySelector('.userInput').style.display = 'block'
					treasureHunts.style.display = 'none'
					await start()
				}
			})
		})
}

async function start() {
	let uuid = localStorage.getItem('uuid')
	let playerName = playerNameInput.value.trim()
	if (playerName !== '') {
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
		localStorage.setItem('sessionID', sessionID)
		addWordToStorage()
		getQuestion(sessionID)
		return sessionID
	}
}

start().then(sessionID => {
	getQuestion(sessionID)
})

function addWordToStorage() {
	let word = playerNameInput.value.trim()
	if (word !== '') {
		try {
			let storedWords = JSON.parse(localStorage.getItem('storedWords')) || []
			if (storedWords.includes(word)) {
				alert('Such name has already been used before, try again')
				return
			}
			storedWords.push(word)
			localStorage.setItem('storedWords', JSON.stringify(storedWords))
			playerNameInput.value = ''
		} catch (error) {
			console.error('Reading error')
		}
	}
}
