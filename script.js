const API_URL = 'https://jsonfakery.com/movies/paginated';
let allMovies = [];

const heroCollage = document.getElementById('hero-collage');
const movieContainer = document.getElementById('movie-container');
const modal = document.getElementById('detail-modal');
const closeModal = document.getElementById('close-modal');

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allMovies = data.data || [];
        
        if (allMovies.length > 0) {
            buildHeroCollage();
            buildMovieRow();
        }
    } catch (error) {
        console.error("Failed to load API:", error);
    }
}

//grid making
function buildHeroCollage() {
    
    const collageMovies = allMovies.slice(0, 15);
    
    
    const fadeOverlay = heroCollage.querySelector('.fade-overlay');
    heroCollage.innerHTML = '';
    heroCollage.appendChild(fadeOverlay);

    collageMovies.forEach(movie => {
        const poster = document.createElement('div');
        poster.className = 'collage-poster';
        poster.style.backgroundImage = `url('${movie.poster_path}')`;
        heroCollage.appendChild(poster);
    });
}
function buildMovieRow() {
    movieContainer.innerHTML = '';
    
    allMovies.forEach((movie, index) => {
        
        const wrapper = document.createElement('div');
        wrapper.className = 'card-wrapper';
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.backgroundImage = `url('${movie.poster_path}')`;
        card.dataset.index = index;
        
        
        const title = document.createElement('div');
        title.className = 'movie-title';
        title.textContent = movie.original_title;
        
        card.addEventListener('click', () => openModal(movie));
        
        
        wrapper.appendChild(card);
        wrapper.appendChild(title);
        
        movieContainer.appendChild(wrapper);
    });
}
function openModal(movie) {
    document.getElementById('modal-poster').style.backgroundImage = `url('${movie.poster_path}')`;
    document.getElementById('modal-title').textContent = movie.original_title;
    document.getElementById('modal-desc').textContent = movie.overview || 'No description available.';
    
    const castContainer = document.getElementById('modal-cast');//done change here cast-casts
    castContainer.innerHTML = '';
    
    const castArray = movie.casts || [];
    castArray.slice(0, 5).forEach(actor => {
        const pic = actor.profile_path || 'https://via.placeholder.com/60';
        castContainer.innerHTML += `
            <div class="cast-member">
                <img src="${pic}" alt="${actor.name}">
                <p>${actor.name}</p>
            </div>
        `;
    });
    
    modal.classList.remove('hidden');
}
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});
fetchMovies();
