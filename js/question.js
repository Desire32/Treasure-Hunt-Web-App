let SeenQuestion = document.getElementById('question')

let params = new URLSearchParams(window.location.search)
let uuid = params.get('uuid') 

let url = 'https://codecyprus.org/th/api/question?' + params.toString()

fetch(url)
	.then(response => response.json())
	.then(jsonObject => {
		let html = ''
		for (let i = 0; i < jsonObject.errorMessages.length; i++) {
			html += `<li class="errorMessage">${jsonObject.errorMessages[i]}</li>`
		}
		SeenQuestion.innerHTML = html
	})

  function handleClick(uuid) {
		location.href = 'list.html?uuid=' + uuid
	}




