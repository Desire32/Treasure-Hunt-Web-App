

let SeenQuestion = document.getElementById('questionField')

let uuid = localStorage.getItem('uuid');

fetch('https://codecyprus.org/th/api/question?session=' + uuid)
	.then(response => response.json())
	.then(jsonObject => {
		console.log(jsonObject)
		let html = ''
		html += `<li class="errorMessage">${jsonObject.errorMessages}</li>`
		SeenQuestion.innerHTML = html
	})