import React, { Component } from 'react';
import { Pagination } from 'antd';
import debounce from 'lodash.debounce'

import MovieService from "../Service/MoviesService";
import MoviesList from '../MoviesList';
import SearchInpit from '../SearchInput';
import Spiner from '../Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import "./App.css"

class App extends Component {
  state = {
    moviesData: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: true,
    isError: false,
    isOnline: navigator.onLine,
  }

  componentDidMount() {
    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);

    this.state.isOnline ? this.fetchMovies() : this.setState({ isError: true });
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ isOnline: true }, this.fetchMovies);
  };

  handleOffline = () => {
    this.setState({ isOnline: false, isError: true });
  };

  onError = () => {
    this.setState({ isError: true, isLoading: false });
  }

  fetchMovies = (page = 1) => {
    this.setState({ isLoading: true });

    const moviesAPI = new MovieService();
    const moviesList = moviesAPI.getMoviesPage(page);

    moviesList.then(movies => {
      this.setState({
        moviesData: [...movies],
        currentPage: page,
        isLoading: false
      })
    })
      .catch(this.onError)
  }

  searchMovies = (query, page = 1) => {
    this.setState({ isLoading: true });

    const moviesAPI = new MovieService();
    const moviesList = moviesAPI.getFoundMovies(query, page);

    moviesList.then(movies => {
      this.setState({
        moviesData: [...movies],
        currentPage: page,
        isLoading: false
      })
    })
      .catch(this.onError)
  }

  handleSearchChange = (e) => {
    const query = e.target.value;
    this.setState({ searchQuery: query });

    this.debouncedSearch(query)
  }

  debouncedSearch = debounce((query) => {
    if (query.trim() === '') {
      this.fetchMovies();
    } else {
      this.searchMovies(query)
    }
  }, 1000)

render() {
  const { moviesData, currentPage, isLoading, isError, isOnline } = this.state;

  const showError = isError ? <ErrorMessage isOnline={isOnline} /> : null;
  const spiner = isLoading ? <Spiner /> : null;
  const content = !isLoading && !isError ? (
    <React.Fragment>
      <SearchInpit value={this.state.searchQuery} onChange={this.handleSearchChange} />
      <MoviesList moviesData={moviesData} />
      <Pagination
        current={currentPage}
        pageSize={20}
        total={10000}
        onChange={(page) => this.fetchMovies(page)}
        showSizeChanger
        onShowSizeChange={(current) => this.fetchMovies(1)}
      />
    </React.Fragment>
  ) : null;

  return (
    <div className="App">
      {spiner}
      {showError}
      {content}
    </div>
  );
}
}

export default App;
