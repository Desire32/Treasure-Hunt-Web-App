// Define the createTable function
function createTable() {
	var numCols = 4
	var numRows = 10
	var tableHtml = "<table border='1'>"

	// Creating headers

	tableHtml += '<tr>'
	tableHtml += '<th>Rank</th>'
	tableHtml += '<th>Name</th>'
	tableHtml += '<th>Points</th>'
	tableHtml += '<th>Completion Time</th>'
	tableHtml += '</tr>'

	// Creating empty rows
	for (var i = 0; i < numRows; i++) {
		tableHtml += '<tr>'
		for (var j = 0; j < numCols; j++) {
			tableHtml += '<td></td>' // Empty cell
		}
		tableHtml += '</tr>'
	}

	tableHtml += '</table>'
	document.getElementById('tableContainer').innerHTML = tableHtml
}

// Automatically call createTable when the page loads
window.onload = createTable

const nameTextElement = document.getElementById('nameText')
const scoreFieldElement = document.getElementById('scoreField')
getname()
function Rank(score, maxScore, time, totalTime) {
	let percentage = (score / maxScore) * 100
	let timePercentage = ((totalTime - time) / totalTime) * 100
	let rank = (percentage + timePercentage) / 2
	rank = rank.toFixed(2)

	return rank
}
function getname() {
	const URL =
		'https://codecyprus.org/th/api/name?session=' + getCookies(sessionID)
	fetch(URL)
		.then(response => response.json())
		.then(jsonObject => {
			if (jsonObject.status === 'OK') {
				const nameText = jsonObject.nameText
				nameTextElement.innerHTML = nameText
			} else {
				alert(jsonObject.errorMessages[0])
			}
		})
}
getScore()
function getScore() {
	const URL =
		'https://codecyprus.org/th/api/score?session=' + getCookies(sessionID)
	fetch(URL)
		.then(response => response.json())
		.then(jsonObject => {
			if (jsonObject.status === 'OK') {
				const scoreField = jsonObject.scoreField
				scoreFieldElement.innerHTML = scoreField
			} else {
				alert(jsonObject.errorMessages[0])
			}
		})
}
