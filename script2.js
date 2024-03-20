const api = "9d40a638d8489c267049f3d6e0ceb828";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";
const auth_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDQwYTYzOGQ4NDg5YzI2NzA0OWYzZDZlMGNlYjgyOCIsInN1YiI6IjY1Zjg3Yzc2ZDhmNDRlMDE2MzUwYjM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HtnHsUIJLsn6CeZu9ovvUN62heUfeY7a6iWV8zWaBrA";
const headers = {
    'Authorization': `Bearer ${auth_token}`
};


const requests = {
    fetchTrending: `${base_url}/trending/all/week?api_key=${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?api_key=${api}&with_networks=213`,
    fetchActionMovies: `${base_url}/discover/tv?api_key=${api}&with_networks=12`,
    fetchComedyMovies: `${base_url}/discover/tv?api_key=${api}&with_networks=35`,
    fetchHorrorMovies: `${base_url}/discover/tv?api_key=${api}&with_networks=53`,
    fetchRomanceMovies: `${base_url}/discover/tv?api_key=${api}&with_networks=37`,
    fetchDocumentaries: `${base_url}/discover/tv?api_key=${api}&with_networks=16`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Function to create rows for each category
function createRow(title) {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    row.classList.add("netflixrow");
    headrow.appendChild(row);

    const rowTitle = document.createElement("h2");
    rowTitle.className = "row__title";
    rowTitle.innerText = title;
    row.appendChild(rowTitle);

    const rowPosters = document.createElement("div");
    rowPosters.className = "row__posters";
    row.appendChild(rowPosters);

    return rowPosters;
}

// Function to create poster element
function createPoster(movie) {
    const poster = document.createElement("img");
    poster.className = "row__posterLarge";
    if(movie.name)
    {
        poster.id = movie.name.replace(/\s+/g, "");
    }
    else
    {
        poster.id ="Default ID";
    }

    poster.src = img_url + movie.poster_path;
    return poster;
}

// Function to fetch data and populate rows
function fetchAndPopulate(request, title) {
    fetch(request)
        .then((res) => res.json())
        .then((data) => {
            const rowPosters = createRow(title);
            data.results.forEach((movie) => {
                const poster = createPoster(movie);
                rowPosters.appendChild(poster);
                console.log(poster);
            });
        });
}

// Fetch and populate banner
fetch(requests.fetchNetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
        const banner = document.getElementById("banner");
        banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        document.getElementById("banner__description").innerText = truncate(setMovie.overview, 150);
        document.getElementById("banner__title").innerText = setMovie.name;
    });

// Fetch and populate rows for different categories
fetchAndPopulate(requests.fetchNetflixOriginals, "Netflix Orignals");
fetchAndPopulate(requests.fetchTrending, "TRENDING");
fetchAndPopulate(requests.fetchActionMovies, "ANIME");
fetchAndPopulate(requests.fetchComedyMovies, "NETFLIX FOR KIDS");
fetchAndPopulate(requests.fetchHorrorMovies, "AS UNIQUE AS YOU");
fetchAndPopulate(requests.fetchRomanceMovies, "WESTERN SHOWS");
fetchAndPopulate(requests.fetchDocumentaries, "TV SHOWS YOU LIKE");
