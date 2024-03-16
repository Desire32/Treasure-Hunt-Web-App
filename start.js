let params = new URLSearchParams(location.search)
let treasureHuntID = params.get('uuid')
console.log(treasureHuntID)


let errorMessagesStartElement = document.getElementById('errorMessages') //doesnt work for now, needs to read start json file
fetch('https://codecyprus.org/th/api/start')
	.then(response => response.json())
	.then(jsonObject => {
		let html = ''
		for (let i = 0; i < jsonObject.errorMessages.length; i++) {
			html += `<li class="errorMessagesSize" onclick="handleClick('${jsonObject.errorMessages[i].uuid}')">${jsonObject.errorMessages[i].name}</li>`
		}
		errorMessagesStartElement.innerHTML = html;
	})


  function addWordToStorage()
  {
    let word = document.getElementById('playerName').value;

    if(word.trim() !== ''){

      let storedWords= JSON.parse(localStorage.getItem('storedWords')) || [];

      storedWords.push(word);

      localStorage.setItem('storedWords', JSON.stringify(storedWords));


      document.getElementById('playerName').value = '';

      console.log('Stored words: ', storedWords); //testing
    } 
  }