
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
	if (!window.location.href.includes('app.html') && sessionID) {
		let leaderboardLink = document.getElementById('leaderboard-link')
		if (leaderboardLink) {
			leaderboardLink.style.display = 'block'
		}
	}
}