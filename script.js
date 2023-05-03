//You can edit ALL of the code here

let allEpisodes;
let filteredNames;
let allEpisodesFromApi;
let allShows
let tvShowIndex
let countEpisodes = document.querySelector("#count-episodes")
let selectEpisodes 
let mainDiv = document.querySelector("#main-div");


function setup() {
    
    allShows = getAllShows()
    serchBarFunction() 
    selectTvShow(allShows)
  }


// creating all episode cards on page

function createAllCards(givenEpisodes){
  givenEpisodes.map((episode)=>{
    createNewEpisodeCard(episode)
  })
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
window.onload = setup;

// create single card

function createNewEpisodeCard(objectEpisod){
  let mainDiv =document.querySelector("#main-div");
  let newCard = document.createElement("div")
  newCard.classList.add("card")
  let headerCardSection = document.createElement("section")
  headerCardSection.classList.add("title-of-episode")
  let headerTitle = document.createElement("p")
  headerTitle.innerText = objectEpisod["name"]
  let headerSeson = document.createElement("span")
  headerSeson.innerText = `-E${objectEpisod.number.toString().padStart(2, "0")} -S${objectEpisod.season.toString().padStart(2, "0")}`
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
  headerCardSection.appendChild(headerSeson)
  newCard.appendChild(imageSection)
  newCard.appendChild(description)
}



// search bar 

function serchBarFunction(){
    let searchBar = document.querySelector("#search")
    searchBar.addEventListener( "keyup", (e) => {
      let searchString = e.target.value.toLowerCase()

        filteredNames = allEpisodes.filter((episode)=>{
          return (
            episode.name.toLowerCase().includes(searchString) || 
            episode.summary.toLowerCase().includes(searchString)
          )
        })
        countEpisodes.innerText = `Displaying ${filteredNames.length} of ${allEpisodes.length}`
        let mainDiv = document.querySelector("#main-div");
        mainDiv.innerHTML = ""
        createAllCards(filteredNames)
    })
  
}

// select Episode


function createSelectandChooseEpisode (givenEpisode){
  selectEpisodes = document.querySelector("#select-episodes")
  selectEpisodes.innerHTML = ""
  givenEpisode.map((episode)=>{
    let optionElement = document.createElement("option")
    optionElement.innerText = `${episode.name} -E${episode.number.toString().padStart(2, "0")}-S${episode.season.toString().padStart(2, "0")}`
    selectEpisodes.appendChild(optionElement)
  })

  selectEpisodes.addEventListener("change", (event) =>{
    let currentValue = event.target.value
    givenEpisode.forEach((episode) =>{
      if(currentValue.includes(episode.name)){
        mainDiv.innerHTML = ""
        createNewEpisodeCard(episode)
      }
    }) 
  }) 
}

//select TV Show

function selectTvShow(tvShow){
    let selectShow = document.querySelector("#select-tv-show")
    
    tvShow.map((oneShow) =>{
      let optionShow = document.createElement("option")
      optionShow.innerHTML = ""
      optionShow.innerText = oneShow.name
      selectShow.appendChild(optionShow)
    })
     selectShow.addEventListener("change", (event) => {
      let currentShow = event.target.value
      console.log (currentShow)
      tvShow.forEach((show) => {
        if(show.name === currentShow){
          tvShowIndex = show.id
          mainDiv.innerHTML = ""
          fetchShows(tvShowIndex)
          console.log(show)
        }
      })
     })
}

// fetch different shows

function fetchShows(result){
fetch(`https://api.tvmaze.com/shows/${result}/episodes`)
    .then((response) => {
      if (response.ok){
        return response.json();
      } else {
        console.log("Error") 
      }
    })
    .then((data) => {
      allEpisodes = data
      createAllCards(allEpisodes)
      createSelectandChooseEpisode(allEpisodes)
    });
    
}









 













  
  






