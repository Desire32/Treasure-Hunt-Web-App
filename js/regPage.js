let SeenQuestion = document.getElementById('questionField')
let treasureHuntsListElement = document.getElementById('treasureHunts')
let testElements = document.getElementById('testInfo')
let testNameElement = document.getElementById('testInfo')
let playerNameInput = document.getElementById('playerName')
let nameButton = document.getElementById('nameButton')
let sessionID = localStorage.getItem('sessionID')

function loadDataAndStart() {
	fetch('https://codecyprus.org/th/api/list')
		.then(response => response.json())
		.then(jsonObject => {
			console.log(jsonObject)
			let html = ''
			jsonObject.treasureHunts.forEach(treasureHunt => {
				html += `<li class="treasureHuntFontSize" data-uuid="${treasureHunt.uuid}">${treasureHunt.name}</li>`
			})
			treasureHuntsListElement.innerHTML = html

			treasureHuntsListElement.addEventListener('click', function (event) {
				let clickedElement = event.target
				uuid = clickedElement.getAttribute('data-uuid')
				localStorage.setItem('uuid', uuid)
				if (uuid) {
					document.querySelector('.userInput').style.display = 'block'
					treasureHunts.style.display = 'none'
				}
			})
		})
}

loadDataAndStart()

function start() {
	uuid = localStorage.getItem('uuid')
	let playerName = playerNameInput.value.trim()
	if (playerName !== '') {
		let url =
			'https://codecyprus.org/th/api/start' +
			'?player=' +
			playerName +
			'&app=ComputerLegendsApp' +
			'&treasure-hunt-id=' +
			uuid

		fetch(url)
			.then(response => response.json())
			.then(jsonObject => {
				console.log(jsonObject)
				localStorage.setItem('sessionID', jsonObject.session)
				getQuestion()
			})
		addWordToStorage()
	}
}
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
