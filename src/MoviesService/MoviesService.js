export default class MoviesService {
    async getResource(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`);
        }

        return await res.json();
    }

    async postRatingMovies(movieId, rating, sessionId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=8490441a780d696323472e0a8e97e0ca&guest_session_id=${sessionId}`;
        console.log("ID фильма:", movieId);
        console.log("Оценка:", rating);
        console.log("Тип оценки:", typeof rating);
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ value: rating })
        });

        if (!res.ok) {
            throw new Error(`Could not rate movie ${movieId}`);
        }

        return await res.json();
    }

    async getRatedMovies(sessionId, page = 1) {
        const res = await this.getResource(`https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=8490441a780d696323472e0a8e97e0ca&page=${page}`);
        return res.results;
    }

    async createGuestSession() {
        const res = await this.getResource('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=8490441a780d696323472e0a8e97e0ca');
        return res.guest_session_id;
    }

    async getMoviesPage(page) {
        const res = await this.getResource(`https://api.themoviedb.org/3/discover/movie?api_key=8490441a780d696323472e0a8e97e0ca&page=${page}`);
        return res.results;
    }

    async getFoundMovies(query, page = 1) {
        const res = await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=8490441a780d696323472e0a8e97e0ca&query=${encodeURIComponent(query)}&page=${page}`);
        return res.results;
    }

    async getMoviesGenres() {
        const res = await this.getResource('https://api.themoviedb.org/3/genre/movie/list?api_key=8490441a780d696323472e0a8e97e0ca&language=en-US');
        return res.genres;
    }
}
