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
		'https://codecyprus.org/th/api/name?session=' +
		getCookies(sessionID)
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
