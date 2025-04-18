import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import MoviesService from '../MoviesService';

const MoviesServiceContext = React.createContext();

class MoviesServiceProvider extends Component {
  moviesAPI = new MoviesService();

  state = {
    guestSessionId: null,
    moviesData: [],
    totalResults: 10000,
    currentPage: 1,
    searchQuery: '',
    genresData: [],
    isLoading: true,
    isError: false,
    isOnline: navigator.onLine,
    movieRatings: {},
  };

  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    if (this.state.isOnline) {
      this.fetchMovies();
      this.fetchGenres();
      this.createGuestSession();
    } else {
      this.setState({ isError: true });
    }

    this.state.isOnline ? this.createGuestSession() : this.setState({ isError: true });
    this.state.isOnline ? this.fetchMovies() : this.setState({ isError: true });
    this.state.isOnline ? this.fetchGenres() : this.setState({ isError: true });
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ isOnline: true }, this.fetchMovies);
  };

  handleOffline = () => {
    this.setState({ isOnline: false, isError: true });
  };

  onRate = (movieId, value) => {
    const { guestSessionId } = this.state;
    this.moviesAPI.postRatingMovies(movieId, value, guestSessionId).then((response) => {
      console.log(`Оценка ${value} для фильма ${movieId} успешно отправлена`, response);
      this.setState((prevState) => ({
        movieRatings: {
          ...prevState.movieRatings,
          [movieId]: value,
        },
      }));
    });
  };

  onError = () => {
    this.setState({ isError: true, isLoading: false });
  };

  createGuestSession = () => {
    const guestSessionId = this.moviesAPI.createGuestSession();

    guestSessionId.then((id) => {
      this.setState({
        guestSessionId: id,
      });
    });
  };

  fetchMovies = (page = 1) => {
    this.setState({ isLoading: true });
    const moviesList = this.moviesAPI.getMoviesPage(page);

    moviesList
      .then((movies) => {
        this.setState({
          moviesData: [...movies],
          totalResults: 10000,
          currentPage: page,
          isLoading: false,
        });
      })
      .catch(this.onError);
  };

  fetchRatedMovies = (page) => {
    const { guestSessionId } = this.state;

    this.setState({ isLoading: true });
    const ratedMoviesList = this.moviesAPI.getRatedMovies(guestSessionId, page);

    ratedMoviesList
      .then((ratedMovies) => {
        this.setState({
          moviesData: ratedMovies,
          currentPage: page,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error.message);
        if (error.message.includes('404')) {
          this.setState({
            moviesData: [],
            isLoading: false,
          });
        } else {
          this.onError();
        }
      });
  };

  fetchGenres = () => {
    const genresList = this.moviesAPI.getMoviesGenres();
    console.log(genresList);
    genresList.then((genres) => {
      this.setState({
        genresData: genres,
      });
    });
  };

  searchMovies = (query, page = 1) => {
    this.setState({ isLoading: true });
    const moviesList = this.moviesAPI.getFoundMovies(query, page);
    query === ''
      ? this.fetchMovies(page)
      : moviesList
          .then((movies) => {
            this.setState({
              moviesData: [...movies.results],
              totalResults: movies.total_results,
              currentPage: page,
              isLoading: false,
            });
          })
          .catch(this.onError);
  };

  handleSearchChange = (e) => {
    const query = e.target.value;
    this.setState({ searchQuery: query });

    this.debouncedSearch(query);
  };

  debouncedSearch = debounce((query) => {
    if (query.trim() === '') {
      this.fetchMovies();
    } else {
      this.searchMovies(query);
    }
  }, 1000);

  render() {
    return (
      <MoviesServiceContext.Provider
        value={{
          ...this.state,
          fetchMovies: this.fetchMovies,
          fetchRatedMovies: this.fetchRatedMovies,
          fetchGenres: this.fetchGenres,
          searchMovies: this.searchMovies,
          handleSearchChange: this.handleSearchChange,
          onRate: this.onRate,
          movieRatings: this.state.movieRatings,
        }}
      >
        {this.props.children}
      </MoviesServiceContext.Provider>
    );
  }
}

export { MoviesServiceProvider, MoviesServiceContext };
