export default class MovieService {
    async getResource(url) {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`);
        }

        return await res.json();
    }

    async getMoviesPage(page) {
        const res = await this.getResource(`https://api.themoviedb.org/3/discover/movie?api_key=8490441a780d696323472e0a8e97e0ca&page=${page}`);
        return res.results;
    }

    async getFoundMovies(query, page = 1) {
        const res = await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=8490441a780d696323472e0a8e97e0ca&query=${encodeURIComponent(query)}&page=${page}`);
        return res.results;
    }
}
