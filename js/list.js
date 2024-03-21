let treasureHuntsListElement = document.getElementById('treasureHunts')
let testElements = document.getElementById('testInfo');

fetch('https://codecyprus.org/th/api/list')
	.then(response => response.json())
	.then(jsonObject => {
		console.log(jsonObject)

		let html = ''
		jsonObject.treasureHunts.forEach(treasureHunt => {
			html += `<li class="treasureHuntFontSize" data-uuid="${treasureHunt.uuid}">${treasureHunt.name}</li>`
		})
		treasureHuntsListElement.innerHTML = html

		// Добавим обработчик событий после загрузки данных
		treasureHuntsListElement.addEventListener('click', function (event) {
			let clickedElement = event.target
			let uuid = clickedElement.getAttribute('data-uuid')
			if (uuid) {
				document.querySelector('.userInput').style.display = 'block'
				console.log(uuid)
				testElements.innerHTML = `<li>UUID: ${uuid}</li>`
			}
		})
	})
	.catch(error => {
		console.error('Error fetching treasure hunts list:', error)
		treasureHuntsListElement.innerHTML =
			'<li class="errorMessage">Error fetching treasure hunts list. Please try again later.</li>'
	})
