//loading the API board, inside there is an automatic error reader in case of errors, the session is logged from cookies


let sessionID = getCookie('sessionID')
let leaderboardData

async function fetchLeaderboard(sessionID) {
	let leaderboardURL =
		'https://codecyprus.org/th/api/leaderboard?session=' + sessionID
	let response = await fetch(leaderboardURL)
	let jsonObject = await response.json()
	

	if (jsonObject.status === 'ERROR') {
		if (jsonObject.errorMessages && jsonObject.errorMessages.length > 0) {
			for (let i = 0; i < jsonObject.errorMessages.length; i++) {
				alert(jsonObject.errorMessages[i])
			}
		}
		return false
	}

	return jsonObject
}

// creating the table itself into which data is loaded from the API
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

// fetches leaderboard data and creates a table with it
async function fetchAndCreateTable(sessionID) {
	leaderboardData = await fetchLeaderboard(sessionID)
	console.log(leaderboardData)
	createTable(leaderboardData.leaderboard)
}

// sorting of the leaderboard data and recreates the table
function sortAndRecreateTable() {
	leaderboardData.leaderboard.sort((a, b) => b.score - a.score)
	createTable(leaderboardData.leaderboard)
}

// event listener for the reset button
// when clicked, the leaderboard data is fetched again and the table is recreated
document
	.getElementById('sortButton')
	.addEventListener('click', sortAndRecreateTable)

// fetch leaderboard data and create a table with it when the page loads
document
	.getElementById('resetButton')
	.addEventListener('click', () => fetchAndCreateTable(sessionID))

fetchAndCreateTable(sessionID)
