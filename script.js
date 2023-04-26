//You can edit ALL of the code here

let allEpisodes;
let filteredNames;

function setup() {
    allEpisodes = getAllEpisodes();
    // makePageForEpisodes(allEpisodes);
    createAllCards(allEpisodes)
    serchBarFunction()
  }

function createAllCards(givenEpisodes){
  givenEpisodes.map((episode)=>{
    return createNewEpisodeCard(episode)
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
  description.classList.add("description-episode")
  description.innerText = objectEpisod.summary

  mainDiv.appendChild(newCard)
  newCard.appendChild(headerCardSection)
  headerCardSection.appendChild(headerTitle)
  headerCardSection.appendChild(headerEpisode)
  headerCardSection.appendChild(headerSeson)
  newCard.appendChild(imageSection)
  newCard.appendChild(description)
}

 let countEpisodes = document.querySelector("#count-episodes")
 countEpisodes.innerText = `Displaying ${allEpisodes.length} of ${allEpisodes.length}`

 function serchBarFunction(){
    let searchBar = document.querySelector("#search")
    searchBar.addEventListener( "keyup", (e) => {
      let searchString = e.target.value.toLowerCase()

        filteredNames = allEpisodes.filter((episode)=>{
          return episode.name.toLowerCase().includes(searchString)
        })
   
        countEpisodes.innerText = `Displaying ${filteredNames.length} of ${allEpisodes.length}`
    
        let mainDiv = document.querySelector("#main-div");
        mainDiv.innerHTML = ""
        createAllCards(filteredNames)
      })
  
  }
  
  






