
function htmlToJSFooter() {
	const footerElement = document.getElementById('footer')
	const firstPart = `
                <div class="left">
                    <h2>Links</h2>
                    <p><a href="https://www.uclansu.co.uk/">Student's Union</a></p>
                </div>
            `
	const secondPart = `
                <div class="middle">
                    <h2>Contact</h2>
                </div>
            `
	const thirdPart = `
                
            `

	footerElement.innerHTML = firstPart + secondPart + thirdPart
}
// initialisation of function
htmlToJSFooter()
