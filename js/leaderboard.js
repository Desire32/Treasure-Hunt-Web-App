let sessionID = getCookie('sessionID')
let leaderboardData

async function fetchLeaderboard(sessionID) {
	let leaderboardURL =
		'https://codecyprus.org/th/api/leaderboard?session=' + sessionID
	let response = await fetch(leaderboardURL)
	let jsonObject = await response.json()
	return jsonObject
}

function createTable(leaderboardData) {
	var numCols = 4
	var numRows = leaderboardData.length
	var tableHtml = "<table border='1'>"

	var headers = ['Rank', 'Name', 'Points', 'Completion Time']

	tableHtml += '<tr>'
	for (var j = 0; j < numCols; j++) {
		tableHtml += '<th style="color: gray;">' + headers[j] + '</th>'
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
	leaderboardData = await fetchLeaderboard(sessionID)
	console.log(leaderboardData)
	createTable(leaderboardData.leaderboard)
}

function sortAndRecreateTable() {
	leaderboardData.leaderboard.sort((a, b) => b.score - a.score)
	createTable(leaderboardData.leaderboard)
}

document
	.getElementById('sortButton')
	.addEventListener('click', sortAndRecreateTable)

document
	.getElementById('resetButton')
	.addEventListener('click', () => fetchAndCreateTable(sessionID))

fetchAndCreateTable(sessionID)
//