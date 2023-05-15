//You can edit ALL of the code here

let allEpisodes;
let filteredNames;
let allEpisodesFromApi;
let allShows
let tvShowIndex
let countEpisodes = document.querySelector("#count-episodes")
countEpisodes.classList.add("counter")
let selectEpisodes 
let mainDiv = document.querySelector("#main-div");
let searchBar
let searchBarShows
let counterForShows

let oneShow = getOneShow()


function setup() {
  document.querySelector(".section").style.display = "none"
  document.querySelector("#select-episodes").style.display= "none"
  allShows = getAllShows()
  createSearchForTVShows() 
  serchBarFunction()
  selectTvShow(allShows)
  serchBarTvShows()
  createBackButton()
  document.querySelector(".go-back-button").style.display = "none"
  
    
  document.querySelector("#count-episodes").style.display = "none"

  displayBackAllTVShows(allShows)
  createAllTVShowsOnPage(allShows)

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
  headerTitle.innerText = `${objectEpisod["name"]} -E${objectEpisod.number.toString().padStart(2, "0")} -S${objectEpisod.season.toString().padStart(2, "0")}`
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
  newCard.appendChild(imageSection)
  newCard.appendChild(description)
}



// search bar 

function serchBarFunction(){
  searchBar = document.querySelector("#search")
  searchBar.addEventListener( "input", handlesSearchChange)
     
}

function handlesSearchChange (event){
   let searchString = event.target.value.toLowerCase()

      filterTheEpisodes (allEpisodes, searchString)
      countEpisodes.innerText = `Displaying ${filteredNames.length} of ${allEpisodes.length}`
      mainDiv = document.querySelector("#main-div");
       mainDiv.innerHTML = ""
      createAllCards(filteredNames)
}

function filterTheEpisodes (allEpisodes, searchStringArgument){

  filteredNames = allEpisodes.filter((episode)=>{
          return (
            episode.name.toLowerCase().includes(searchStringArgument) || 
            episode.summary.toLowerCase().includes(searchStringArgument)
          )
        })
}

// select Episode // select Episode // select Episode // select Episode // select Episode // select Episode


function createSelectandChooseEpisode (givenEpisode){
  selectEpisodes = document.querySelector("#select-episodes")
  selectEpisodes.innerHTML = ""

    let optionElement = document.createElement("option")
    optionElement.innerText = "All Episodes"
    selectEpisodes.appendChild(optionElement)

    createingAllEpisodesOnPage(givenEpisode)
    selectEpisodes.addEventListener("change", dropDownOnClickEpisode) 
}

// dropdown when click

function dropDownOnClickEpisode(event){
  let currentValue = event.target.value
   if(currentValue === "All Episodes"){
      createAllCards(givenEpisode)
      countEpisodes.innerText = `${allEpisodes.length} of ${allEpisodes.length}`
    } else {
      allEpisodes.forEach((episode) =>{
        if(currentValue.includes(episode.name)){
          mainDiv.innerHTML = ""
          createNewEpisodeCard(episode)
          countEpisodes.innerText = `Displaying 1 of ${allEpisodes.length}`
        }
      }) 
    }
}

// create all Episodes on Page

function createingAllEpisodesOnPage(givenEpisode){
  givenEpisode.map((episode)=>{
      optionElement = document.createElement("option")
      optionElement.innerText = `${episode.name} -E${episode.number.toString().padStart(2, "0")}-S${episode.season.toString().padStart(2, "0")}`
      selectEpisodes.appendChild(optionElement)
    })
}
    



//select TV Show //select TV Show //select TV Show //select TV Show //select TV Show

let selectShow

function selectTvShow(tvShow){

  let searchShowsHolder = document.querySelector("#search-shows-main")
  
      selectShow = document.querySelector("#select-tv-show") 
      searchShowsHolder.appendChild(selectShow)

      let dropdownOfShows = tvShow.map((oneShow) =>{
        return oneShow.name
      })

    dropdownForTVShows(dropdownOfShows, selectShow)
    selectShow.addEventListener("change", dropdownOnClick)
}
// select tv show from Dropdown and passing it to EventListener 



function dropdownOnClick(event){
  document.querySelector(".section").style.display = "flex"
  document.querySelector("#select-episodes").style.display = "block"
  document.querySelector("#select-tv-show").style.display = "none"
  document.querySelector(".count-shows").style.display = "none"
  document.querySelector(".search-shows").style.display = "none" 
  document.querySelector(".go-back-button").style.display = "block"
  document.querySelector("#count-episodes").style.display = "block"

  searchBar.value = ""
  searchBarShows.value = ""

      let currentShow = event.target.value
      allShows.forEach((show) => {
        if(show.name === currentShow){
          tvShowIndex = show.id
          mainDiv.innerHTML = ""
          fetchShows(tvShowIndex)
        }
      })
}


//create back BUTTON

function createBackButton(){
    
    let backButton = document.createElement("button")
    backButton.classList.add("go-back-button")
    backButton.innerText = "Back to All TV Shows"
    let searchShowsHolder = document.querySelector("#search-shows-main")
    searchShowsHolder.appendChild(backButton)
    backButton.addEventListener("click", displayBackAllTVShows)
}

// afer we click back button

function displayBackAllTVShows(){
  document.querySelector(".section").style.display = "none"
  document.querySelector("#select-episodes").style.display= "none"
  document.querySelector("#select-tv-show").style.display = "block"
  document.querySelector(".count-shows").style.display = "block"
  document.querySelector(".search-shows").style.display = "block"
  document.querySelector(".go-back-button").style.display = "none"
  document.querySelector("#count-episodes").style.display = "none"
  mainDiv.innerHTML = "";
  createAllTVShowsOnPage(allShows)
  selectShow.innerHTML = ""

  let allShowsBack = allShows.map((oneShow) =>{
      return oneShow.name
  })

  dropdownForTVShows(allShowsBack, selectShow)
  counterForShows.innerText = `Found ${allShowsBack.length} shows`
}




// Dropdown for TV Shows

function dropdownForTVShows(someDropDown, selectShow){
    selectShow.innerHTML = ""
    let optionShow = document.createElement("option")
      optionShow.innerText = "Select TV Show"
      selectShow.appendChild(optionShow)
    let finalDropDown = someDropDown.sort()
    

    finalDropDown.map((singlOption)=>{
      optionShow = document.createElement("option")
      optionShow.innerText = singlOption
      selectShow.appendChild(optionShow)
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
      console.log(createSelectandChooseEpisode(allEpisodes))
      createSelectandChooseEpisode(allEpisodes)
      countEpisodes.innerText = `Displaying ${allEpisodes.length} of ${allEpisodes.length}`

    });
    
}

//createSingleTVShowCard

function createTVShowSingleCard(objectTVShows){
  let tvShowMainHolder = document.createElement("div")
  tvShowMainHolder.classList.add("TVShow-main-holder")
  let tvShowCardHeader = document.createElement("h3")
  tvShowCardHeader.classList.add("TVShow-Card-Header")
  tvShowCardHeader.innerText = objectTVShows.name
  let innerHolder = document.createElement("div")
  innerHolder.classList.add("inner-Holder")

  let tvShowImage = document.createElement("img")
  tvShowImage.classList.add("tvShow-Image")
  tvShowImage.src = objectTVShows.image?.medium

  let tvShowDescription = document.createElement("p")
  tvShowDescription.classList.add("tvShow-Description")
  tvShowDescription.innerText = objectTVShows.summary

  let tvShowInfoCard = document.createElement("div")
  tvShowInfoCard.classList.add("tvShow-info-card")

  infoCardRate = document.createElement("h4")
  infoCardRate.classList.add("info-card-list")
  infoCardRate.innerText = `Rated: ${objectTVShows.rating.average}`

  let infoCardGenres = document.createElement("h2")
  infoCardGenres.classList.add("info-card-list")
  infoCardGenres.innerText = `Genres: ${(objectTVShows.genres).join(", ")}`


  infoCardStatus = document.createElement("h4")
  infoCardStatus.classList.add("info-card-list")
  infoCardStatus.innerText = `Status: ${objectTVShows.status}`

  infoCardRuntime = document.createElement("h4")
  infoCardRuntime.classList.add("info-card-list")
  infoCardRuntime.innerText = `Runtime: ${objectTVShows.runtime}`
  
  innerHolder.appendChild(tvShowImage)
  innerHolder.appendChild(tvShowDescription)
  innerHolder.appendChild(tvShowInfoCard)

  tvShowInfoCard.appendChild(infoCardRate)
  tvShowInfoCard.appendChild(infoCardGenres)
  tvShowInfoCard.appendChild(infoCardStatus)
  tvShowInfoCard.appendChild(infoCardRuntime)

  tvShowMainHolder.appendChild(tvShowCardHeader)
  tvShowMainHolder.appendChild(innerHolder)
  mainDiv.appendChild(tvShowMainHolder)
}

//createAllTVShowCard

function createAllTVShowsOnPage(allTVShows){
  allTVShows.map((oneTVShow)=>{
    createTVShowSingleCard(oneTVShow)
  })
    
}


// search for TV Shows


function createSearchForTVShows (){
  let searchShowsHolder = document.querySelector("#search-shows-main")
  let searchShows = document.createElement("input")
  searchShows.type = "search"
  searchShows.classList.add("search-shows")
  searchShowsHolder.appendChild(searchShows)
  counterForShows = document.createElement("p")
  counterForShows.classList.add("count-shows")

  searchShowsHolder.appendChild(counterForShows)
  counterForShows.innerText = `Found ${allShows.length} shows`
}

// search bar 


function serchBarTvShows(){
  searchBarShows = document.querySelector(".search-shows")
  searchBarShows.addEventListener( "input", forEventTVShow)
     
}

let filteredShows

function forEventTVShow(event){

  let searchingValue = event.target.value.toLowerCase()
  filterTvShows(allShows, searchingValue)
  mainDiv.innerHTML = "";
  createAllTVShowsOnPage(filteredShows)
  counterForShows.innerText = `Found ${filteredShows.length} shows`

    let newdropdownOfShows = filteredShows.map((oneShow) =>{
        return oneShow.name
      })

  dropdownForTVShows(newdropdownOfShows, selectShow)
}

function filterTvShows(allTvShows, searchValueArgument){
  filteredShows = allTvShows.filter((singleShow)=>{
    return (singleShow.name.toLowerCase().includes(searchValueArgument) ||
    singleShow.summary.toLowerCase().includes(searchValueArgument))
  })
}













 













  
  






