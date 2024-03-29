
function setCookie(cookieName, cookieValue, expireDays) {
	let date = new Date()
	date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000)
	let expires = 'expires=' + date.toUTCString()
	document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/; SameSite=None; Secure`
}

function getCookie(name) {
	let nameEQ = name + '='
	let cookies = document.cookie.split(';')
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i]
		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1, cookie.length)
		}
		if (cookie.indexOf(nameEQ) === 0) {
			return cookie.substring(nameEQ.length, cookie.length)
		}
	}
	return null
}

const LOCATION_REQUESTED = 'locationRequested'

document.addEventListener('DOMContentLoaded', async function () {
	let locationRequested = getCookie(LOCATION_REQUESTED)
	let currentQuestion = getCookie('currentQuestion')

	if (!locationRequested) {
		await getLocation()
		setCookie(LOCATION_REQUESTED, 'true', 30)
	}

	if (currentQuestion) {
		currentQuestion = JSON.parse(currentQuestion)
		elements.SeenQuestion.innerHTML = generateQuestionHTML(currentQuestion)
	}

	fetchTreasureHunts()

	setInterval(() => {
		getLocation(sessionID)
			.then(() => {
				console.log('Location updated successfully.')
			})
			.catch(error => {
				console.error('Error updating location:', error)
			})
	}, 30000)

})

//

async function getLocation(sessionID) {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					showPosition(position, sessionID)
					resolve()
				},
				function (error) {
					reject(error)
				},
				{
					enableHighAccuracy: true,
				}
			)
		} else {
			reject(new Error('Geolocation is not supported'))
		}
	})
}



async function showPosition(position) {
	setCookie('latitude', position.coords.latitude, 30)
	setCookie('longitude', position.coords.longitude, 30)
}
