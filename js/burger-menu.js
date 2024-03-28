
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
	let leaderboardLink = document.getElementById('leaderboard-link')
	if (!sessionID) {
		leaderboardLink.style.display = 'none'
	} else {
		leaderboardLink.style.display = 'block'
	}
}