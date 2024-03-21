let treasureHuntsListElement = document.getElementById('treasureHunts')

fetch('https://codecyprus.org/th/api/list')
	.then(response => response.json())
	.then(jsonObject => {
		console.log(jsonObject)
		
		let html = ''
		jsonObject.treasureHunts.forEach(treasureHunt => {
			html += `<li class="treasureHuntFontSize" onclick="handleClick('${treasureHunt.uuid}')">${treasureHunt.name}</li>`
		})
		treasureHuntsListElement.innerHTML = html
	})
	.catch(error => {
		console.error('Error fetching treasure hunts list:', error)
		treasureHuntsListElement.innerHTML =
			'<li class="errorMessage">Error fetching treasure hunts list. Please try again later.</li>'
	})

