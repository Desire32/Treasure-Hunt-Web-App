let treasureHuntsListElement = document.getElementById('treasureHunts')
fetch('https://codecyprus.org/th/api/list')
	.then(response => response.json())
	.then(jsonObject => {
		let html = ''
		for (let i = 0; i < jsonObject.treasureHunts.length; i++) {
			html += `<li class="treasureHuntFontSize" onclick="handleClick('${jsonObject.treasureHunts[i].uuid}')">${jsonObject.treasureHunts[i].name}</li>`
		}
		treasureHuntsListElement.innerHTML = html
	})

function handleClick(uuid) {
	location.href = 'start.html?uuid=' + uuid
};
