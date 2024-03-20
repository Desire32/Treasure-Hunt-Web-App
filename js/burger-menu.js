// code that reproduces so-called "burger-menu" on each of the pages, allowing you to click and select from a menu when the screen is reduced

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

// a button that appears on the page "products", allowing you to return to the very top of the page

let buttonPressed = document.getElementById('Button')

buttonPressed.addEventListener('click', function () {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
})
