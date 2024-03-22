let treasureHuntsListElement = document.getElementById('treasureHunts')
let testElements = document.getElementById('testInfo')

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
			let uuid = clickedElement.getAttribute('data-uuid')
			localStorage.setItem('uuid', uuid)
			if (uuid) {
				document.querySelector('.userInput').style.display = 'block'
				testElements.innerHTML = `<li>UUID: ${uuid}</li>`
			}
		})
	})

