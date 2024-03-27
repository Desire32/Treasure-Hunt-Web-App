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
	let sessionID = getCookie('sessionID')
	let locationRequested = getCookie(LOCATION_REQUESTED)

	if (!locationRequested) {
		await getLocation(sessionID)
		setCookie(LOCATION_REQUESTED, 'true', 30)
	}

	if (!sessionID) {
		sessionID = await start()
		setCookie('sessionID', sessionID, 30)
	}
	loadScore(sessionID)

	let storedWordsCookie = getCookie('storedWords')
	if (storedWordsCookie) {
		let storedWords = JSON.parse(storedWordsCookie)
	}
})

async function getLocation(sessionID) {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				showPosition(position, sessionID)
				resolve()
			})
		} else {
			reject(new Error('Geolocation is not supported'))
		}
	})
}

async function showPosition(position, sessionID) {
	setCookie('latitude', position.coords.latitude, 30)
	setCookie('longitude', position.coords.longitude, 30)
}
