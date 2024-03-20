document.getElementById('playerName').addEventListener('input', function () {
	let playerName = this.value.trim()
	let nameButton = document.getElementById('nameButton')
	if (playerName !== '') {
    document.getElementById('nameButton').addEventListener('click', function () {
				window.location.href = 'question.html'
			})
		nameButton.disabled = false
	} else {
		nameButton.disabled = true
	}
})

function addWordToStorage() {
	let word = document.getElementById('playerName').value.trim()

	if (word !== '') {
		let storedWords = JSON.parse(localStorage.getItem('storedWords')) || []
		if (storedWords.includes(word)) {
			alert('Such name has already been used before, try again')
			return
		}

		storedWords.push(word)
		localStorage.setItem('storedWords', JSON.stringify(storedWords))

		document.getElementById('playerName').value = ''

		console.log('Stored words:', storedWords) //testing
	}
}
