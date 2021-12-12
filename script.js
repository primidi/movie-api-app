const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovie(inputKeyword.value);
  updateDisplay(movies);
});

function getMovie(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=34e0ec28&s=" + keyword).then((response) => response.json().then((response) => response.Search));
}

function updateDisplay(movies) {
  let cards = "";
  movies.forEach((movie) => (cards += putCards(movie)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// Event binding
document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("modal-detail-button")) {
    const imdbid = event.target.dataset.imdbid;
    const movieDetail = await getMovieDetails(imdbid);
    updateDetails(movieDetail);
  }
});

function getMovieDetails(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=34e0ec28&i=" + imdbid)
    .then((response) => response.json())
    .then((movie) => movie);
}

function updateDetails(movie) {
  const movieDetails = putDetails(movie);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetails;
}

function putCards(movies) {
  return `<div class="col-md-4 my-3">
            <div class="card">
                <img src="${movies.Poster}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${movies.Title}</h5>
                    <p class="card-text">${movies.Year}</p>
                    <a href="#" class="btn btn-dark modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieViewDetail" data-imdbid="${movies.imdbID}">View Details</a>
                </div>
            </div>
        </div>`;
}

function putDetails(movie) {
  return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${movie.Poster}" class="img-fluid"/>
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h3>${movie.Title} (${movie.Year})</h3></li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Actors: </strong> ${movie.Actors}</li>
                        <li class="list-group-item"><strong>Writer: </strong> ${movie.Writer}</li>
                        <li class="list-group-item">
                            <strong>Plot:</strong> <br>
                            ${movie.Plot}
                        </li>
                    </ul>
                </div>
            </div>
        </div>`;
}
