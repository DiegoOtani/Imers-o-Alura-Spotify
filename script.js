const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm){
    
    fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
        .then((response) => response.json())
        .then((result) => displayResults(result));
};

function displayResults(result){
    resultPlaylist.classList.add('hidden');    
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultsArtist.classList.remove('hidden');
};

document.addEventListener('input', ()=>{
    const searchTerm = searchInput.value.toLowerCase();
    if(searchTerm === ''){
        resultPlaylist.classList.remove('hidden');
        resultsArtist.classList.add('hidden');
        return;
    }
    
    requestApi(searchTerm);
});