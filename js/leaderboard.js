
let sessionID = getCookie('sessionID')

async function fetchLeaderboard(sessionID) {
	let leaderboardURL =
		'https://codecyprus.org/th/api/leaderboard?session=' + sessionID
	let response = await fetch(leaderboardURL)
	let jsonObject = await response.json()
	console.log(jsonObject)
	return jsonObject
}

function createTable(leaderboardData) {
	var numCols = 4
	var numRows = leaderboardData.length
	var tableHtml = "<table border='1'>"

	// Creating headers
	tableHtml += '<tr>'
	tableHtml += '<th>Rank</th>'
	tableHtml += '<th>Name</th>'
	tableHtml += '<th>Points</th>'
	tableHtml += '<th>Completion Time</th>'
	tableHtml += '</tr>'

	// Creating rows with data
	for (var i = 0; i < numRows; i++) {
		var playerData = leaderboardData[i]
		tableHtml += '<tr>'
		tableHtml += '<td>' + (i + 1) + '</td>' // Rank
		tableHtml += '<td>' + playerData.player + '</td>' // Name
		tableHtml += '<td>' + playerData.score + '</td>' // Points
		tableHtml += '<td>' + playerData.completionTime + '</td>' // Completion Time
		tableHtml += '</tr>'
	}

	tableHtml += '</table>'
	document.getElementById('tableContainer').innerHTML = tableHtml
}


// Automatically call createTable when the page loads
//window.onload = createTable
//

async function fetchAndCreateTable(sessionID) {
	let leaderboardData = await fetchLeaderboard(sessionID)
	console.log(leaderboardData) 
	createTable(leaderboardData.leaderboard)
}

fetchAndCreateTable(sessionID)

/*function Rank(score, maxScore, time, totalTime) {
	let percentage = (score / maxScore) * 100
	let timePercentage = ((totalTime - time) / totalTime) * 100
	let rank = (percentage + timePercentage) / 2
	rank = rank.toFixed(2)

	return rank
}*/


