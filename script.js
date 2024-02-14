const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const searchError = document.querySelector('.search-error');
const playlistContainer = document.querySelector('.playlist-container');

function requestApi(searchTerm){
    
    fetch(`./api-artists/artists.json`)
        .then((response) => response.json())
        .then((result) => {
            const artists = result.artists;
            const artistsFiltered = artists.filter(artists => artists.name.toLowerCase().includes(searchTerm));
            displayResults(artistsFiltered);
        });
};

function displayResults(artists){
    const artistContainer = document.querySelector('.grid-container');
    artistContainer.innerHTML = '';
    resultPlaylist.classList.add('hidden');    

    if(artists.length === 0){
        resultsArtist.classList.add('hidden');
        searchError.classList.remove('hidden');

    } else{
        for(let artist of artists){
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist-card');

            artistCard.innerHTML = `
                <div class="card-img">
                    <img class="artist-img" src="${artist.urlImg}" alt="${artist.name}">
                    <div class="play">
                        <span class="fa fa-solid fa-play"></span>
                    </div>
                </div>
                <div class="card-text">
                    <a class="vst" href="#"></a>
                    <span class="artist-name" id="artist-name">${artist.name}</span>
                    <span class="artist-categorie">Artista</span>
                </div>
            `;
            artistContainer.appendChild(artistCard);
        }
        resultsArtist.classList.remove('hidden');
        searchError.classList.add('hidden');
    }
};

document.addEventListener('input', ()=>{
    const searchTerm = searchInput.value.toLowerCase();
    if(searchTerm === ''){
        resultPlaylist.classList.remove('hidden');
        resultsArtist.classList.add('hidden');
        playlistContainer.style.height = "68vh"
        return;
    }
    
    requestApi(searchTerm);
    playlistContainer.style.height = "90vh";
});