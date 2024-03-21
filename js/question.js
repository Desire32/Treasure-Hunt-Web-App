

let SeenQuestion = document.getElementById('questionField')

let params = new URLSearchParams(window.location.search)
let uuid = params.get('uuid')
console.log(uuid)

fetch('https://codecyprus.org/th/api/question?session=' + uuid)
	.then(response => response.json())
	.then(jsonObject => {
		console.log(jsonObject)
		let html = ''
		html += `<li class="errorMessage">${jsonObject.errorMessages}</li>`
		SeenQuestion.innerHTML = html
	})
	.catch(error => {
		console.error('Error fetching question:', error)
		SeenQuestion.innerHTML =
			'<li class="errorMessage">Error fetching question. Please try again later.</li>'
	})
