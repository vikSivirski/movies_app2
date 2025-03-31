import {Component} from 'react'

import MovieService from "../Service/MoviesService";
import MoviesList from '../MoviesList';

import "./App.css"

class App extends Component {
  state = {
    moviesData: [],
  }

  componentDidMount() {
    console.log("Компонент монтирован, вызываю fetchMovies");
    this.fetchMovies();
  }

  fetchMovies = () => {
    const moviesAPI = new MovieService();
    const moviesList = moviesAPI.getMoviesPage('1');

    moviesList.then(movies => {
      console.log("Ответ от API:", movies)
      this.setState({moviesData: [...movies]})
    }) 
  }

  render() {
    console.log("Текущий state:", this.state.moviesData)
    return (
      <div className="App">
        <MoviesList moviesData={this.state.moviesData} />
      </div>
    );
  }
}

export default App;
