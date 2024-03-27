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

function Rank(score, maxScore, time, totalTime) {
	let percentage = (score / maxScore) * 100
	let timePercentage = ((totalTime - time) / totalTime) * 100
	let rank = (percentage + timePercentage) / 2
	rank = rank.toFixed(2)

	return rank
}

async function fetchLeaderboard(sessionID){
	let leaderboardURL =
		'https://codecyprus.org/th/api/leaderboard?session=' + sessionID
	let response = await fetch(leaderboardURL)
	let jsonObject = await response.json()
	console.log(jsonObject)
}

