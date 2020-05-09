window.onload = function() {

	let artistName = document.getElementById("artist-name");
	let artTitle = document.getElementById("art-title");
	let artImage = document.getElementById("image-source");
	let submitButton = document.getElementById("submit").addEventListener("click", showArtistName);

	function showArtistName(value) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "http://www.philart.net/api/artists.json", true);
		xhr.onload = function() {
			if(this.status == 200) {
				let dataFromArtist = JSON.parse(this.response);
				let number = document.getElementById("number").value;
				artistName.innerHTML = "<b>Name:</b> " + dataFromArtist.body.list[number].name;

				console.log(dataFromArtist.body.list[number].name)

				let xhr2 = new XMLHttpRequest();
				let artistUrl = dataFromArtist.body.list[number].links[0].href;
				xhr2.open("GET", artistUrl, true);
				xhr2.onload = function() {
					if(this.status == 200) {
						let dataFromAristPage = JSON.parse(this.response);
						artTitle.innerHTML = "<b>Title: </b>" + dataFromAristPage.body.art[0].title.display;
						//artImage.innerHTML = "<b>Description: </b>" + dataFromAristPage.body.art[0].location.description;

						console.log(artistUrl);
						console.log(dataFromAristPage.body.art[0].location.description);
						console.log(dataFromAristPage.body.art[0].pictures[0].large.url);

						artImage.src = dataFromAristPage.body.art[0].pictures[0].large.url;
						console.log("<img src=\"" + dataFromAristPage.body.art[0].pictures[0].large.url + "\"/>")
					}

				}

				xhr2.send();

			} 

		}

		xhr.send();

	};

};