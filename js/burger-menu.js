
// burger menu to open a convenient menu on mobile devices


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


// constant updating via cookies so that the board is not shown to the player until he completes the game
window.onload = function () {
	let sessionID = getCookie('sessionID')
	if (!window.location.href.includes('app.html') && sessionID) {
		let leaderboardLink = document.getElementById('leaderboard-link')
		if (leaderboardLink) {
			leaderboardLink.style.display = 'block'
		}
	}
}