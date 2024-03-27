
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

	var headers = ['Rank', 'Name', 'Points', 'Completion Time']

	tableHtml += '<tr>'
	for (var j = 0; j < numCols; j++) {
		tableHtml += '<th>' + headers[j] + '</th>'
	}
	tableHtml += '</tr>'

	for (var i = 0; i < numRows; i++) {
		var playerData = leaderboardData[i]
		tableHtml += '<tr>'
		tableHtml += '<td>' + (i + 1) + '</td>'
		tableHtml += '<td>' + playerData.player + '</td>'
		tableHtml += '<td>' + playerData.score + '</td>'
		tableHtml += '<td>' + playerData.completionTime + '</td>'
		tableHtml += '</tr>'
	}

	tableHtml += '</table>'
	document.getElementById('tableContainer').innerHTML = tableHtml
}

async function fetchAndCreateTable(sessionID) {
	let leaderboardData = await fetchLeaderboard(sessionID)
	console.log(leaderboardData) 
	createTable(leaderboardData.leaderboard)
}

fetchAndCreateTable(sessionID)


