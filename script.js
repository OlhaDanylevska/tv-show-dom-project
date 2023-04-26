//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  // const oneEpisode = getOneEpisode();
  // createNewEpisodeCard(oneEpisode)
  createAllCards()
  
}

function createAllCards(){
  const allEpisodes = getAllEpisodes();
  allEpisodes.forEach((episode)=>{
    createNewEpisodeCard(episode)
  })
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

function createNewEpisodeCard(objectEpisod){
  let mainDiv =document.querySelector("#main-div");
  let newCard = document.createElement("div")
  newCard.classList.add("card")
  let headerCardSection = document.createElement("section")
  headerCardSection.classList.add("title-of-episode")
  let headerTitle = document.createElement("span")
  headerTitle.innerText = objectEpisod["name"]
  let headerEpisode = document.createElement("span")
  headerEpisode.innerText = `-E${objectEpisod.number.toString().padStart(2, "0")}`
  let headerSeson = document.createElement("span")
  headerSeson.innerText = `-S${objectEpisod.season.toString().padStart(2, "0")}`
  let imageSection = document.createElement("img")
  let objectImage = objectEpisod.image
  imageSection.src = objectImage.medium

  imageSection.classList.add("img")
  let description = document.createElement("p")
  description.classList.add("description-eposode")
  description.innerText = objectEpisod.summary

  mainDiv.appendChild(newCard)
  newCard.appendChild(headerCardSection)
  headerCardSection.appendChild(headerTitle)
  headerCardSection.appendChild(headerEpisode)
  headerCardSection.appendChild(headerSeson)
  newCard.appendChild(imageSection)
  newCard.appendChild(description)
}





