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

document.addEventListener('DOMContentLoaded', function () {
	let sessionID = getCookie('sessionID')
	if (!sessionID) {
		sessionID = start()
		setCookie('sessionID', sessionID, 30)
	}
	loadScore(sessionID)

	let storedWordsCookie = getCookie('storedWords')
	if (storedWordsCookie) {
		let storedWords = JSON.parse(storedWordsCookie)
		console.log('Stored words:', storedWords)
	}
})
