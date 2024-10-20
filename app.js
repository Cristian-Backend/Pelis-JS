const apiKey = '02dfc54a77fa420c649a25fb63dbe4d4';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmRmYzU0YTc3ZmE0MjBjNjQ5YTI1ZmI2M2RiZTRkNCIsIm5iZiI6MTcyOTMwMjc5Ny4wNTM4OTYsInN1YiI6IjY3MTJkOWRjMjVjNzBiOGIxZDY3ZWEwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._vFotMGZgEZN8eywzHDR6pw18aDQGf4BMFPnElumxz0';
const form = document.querySelector('form');
const searchButton = document.querySelector('button[type="submit"]'); // Seleccionar el botón de búsqueda

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Cambiar el texto del botón a "Loading..." y deshabilitar el botón
    searchButton.textContent = 'Loading...';
    searchButton.disabled = true;

    const resultado = await fetchData();

    if (resultado) {
        let movies = document.querySelector('#movies');
        movies.innerHTML = '';

        for (let i = 0; i < resultado.results.length; i++) {
            const title = resultado.results[i].original_title;
            const description = resultado.results[i].overview;
            const poster = resultado.results[i].poster_path;

            movies.innerHTML += `
            <article class="movie-card">
                <h2>${title}</h2>
                <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}" title="${title}">
                <div>
                    <p>${description}</p>
                </div>
            </article>`;
        }
    }

    // Volver a habilitar el botón y cambiar el texto de nuevo a "Buscar Películas"
    searchButton.textContent = 'Buscar Películas';
    searchButton.disabled = false;

    console.log(resultado);
});

async function fetchData() {
    const page = document.querySelector('#page').value;
    const language = document.querySelector('#language').value;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
