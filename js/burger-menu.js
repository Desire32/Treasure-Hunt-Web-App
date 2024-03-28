
let burgerOpen = document.querySelector('.burger-menu-button')
let burgerMenu = document.querySelector('.burger-menu')
let isBurgerOpen = false

burgerOpen.onclick = function () {
	if (!isBurgerOpen) {
		burgerMenu.style.display = 'block'
		isBurgerOpen = true
	} else if (isBurgerOpen) {
		burgerMenu.style.display = 'none'
		burgerOpen.style.backgroundPosition = 'center, center left 50px'
		isBurgerOpen = false
	}
}


window.onload = function () {
	let sessionID = getCookie('sessionID')
	if (!sessionID) {
		console.log('Session ID not found')
		return
	}

	let leaderboardLinks = document.querySelectorAll('.leaderboard-link')
	if (!leaderboardLinks.length) {
		console.log('Leaderboard links not found')
		return
	}

	leaderboardLinks.forEach(link => {
		link.style.display = 'none'
	})
}