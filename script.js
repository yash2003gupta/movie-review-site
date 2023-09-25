// API URLs
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=';

// Get DOM elements
const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

// Initial call to populate movies
returnMovies(APILINK);

// Function to fetch and display movies
function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            data.results.forEach(element => {
                // Create movie card element
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                // Create row and column elements
                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');
                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');
                
                // Create image element and set its attributes
                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.src = IMG_PATH + element.poster_path;

                // Create title element and set its attributes
                const title = document.createElement('h3');
                title.setAttribute('class', 'title');
                title.innerHTML = element.title;

                // Create center element to wrap image
                const center = document.createElement('center');
                center.appendChild(image);
                
                // Assemble the elements
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                // Add the row to the main section
                main.appendChild(div_row);
            });
        });
}

// Add event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = '';

    // Get search input value
    const searchItem = search.value;
    if (searchItem) {
        // Fetch and display movies based on search
        returnMovies(SEARCHAPI + searchItem);
        search.value = '';
    }
});
