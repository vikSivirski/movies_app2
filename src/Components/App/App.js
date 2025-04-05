import { Component } from 'react';

import MovieService from "../Service/MoviesService";
import MoviesList from '../MoviesList';
import Spiner from '../Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import "./App.css"

class App extends Component {
  state = {
    moviesData: [],
    isLoading: true,
    isError: false,
    isOnline: navigator.onLine,
  }

  componentDidMount() {
    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);

    this.state.isOnline ? this.fetchMovies() : this.setState({isLoading: false, isError: true});
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ isOnline: true }, this.fetchMovies);
  };

  handleOffline = () => {
    this.setState({ isOnline: false, isError: true, moviesData: [] });
  };

  onError = (err) => {
    this.setState({isError: true, isLoading: false});
  }

  fetchMovies = () => {
    const moviesAPI = new MovieService();
    const moviesList = moviesAPI.getMoviesPage(1);
    this.setState({isError: false})

    moviesList.then(movies => {
      this.setState({
        moviesData: [...movies],
        isLoading: false
      })
    })
    .catch(this.onError)
  }

  render() {
    const { moviesData, isLoading, isError, isOnline } = this.state;
    const showError = isError || !isOnline ? <ErrorMessage isOnline={isOnline}/> : null;
    const spiner = isLoading && !isError ? <Spiner /> : null;
    const content = !isLoading ? <MoviesList moviesData={moviesData} /> : null;

    return (
      <div className="App">
        {showError}
        {spiner}
        {content}
      </div>
    );
  }
}

export default App;
