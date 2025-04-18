import React, { Component } from 'react';
import { Pagination, Tabs } from 'antd';

import { MoviesServiceContext } from '../../MoviesServiseContext';
import MoviesList from '../MoviesList';
import SearchInpit from '../SearchInput';
import Spiner from '../Spiner';
import ErrorMessage from '../ErrorMessage';

import './App.css';

class App extends Component {
  onTabChange = (key, fetchRatedMovies, fetchMovies) => {
    if (key === '2') {
      fetchRatedMovies();
    }
    if (key === '1') {
      fetchMovies();
    }
  };

  render() {
    return (
      <MoviesServiceContext.Consumer>
        {(context) => {
          const {
            moviesData,
            totalResults,
            genresData,
            currentPage,
            isLoading,
            isError,
            isOnline,
            searchQuery,
            searchMovies,
            handleSearchChange,
            fetchMovies,
            fetchRatedMovies,
          } = context;

          const { TabPane } = Tabs;

          const showError = isError ? <ErrorMessage isOnline={isOnline} /> : null;
          const spiner = isLoading ? <Spiner /> : null;
          const content =
            !isLoading && !isError ? (
              <React.Fragment>
                <SearchInpit value={searchQuery} onChange={handleSearchChange} />
                <MoviesList moviesData={moviesData} genresData={genresData} />
                {moviesData.length >= 20 ? (
                  <Pagination
                    align="center"
                    current={currentPage}
                    defaultPageSize={20}
                    showSizeChanger={false}
                    total={totalResults}
                    onChange={(page) => searchMovies(searchQuery, page)}
                  />
                ) : null}
              </React.Fragment>
            ) : null;
          const ratedContent =
            !isLoading && !isError ? (
              <React.Fragment>
                <MoviesList moviesData={moviesData} genresData={genresData} />
              </React.Fragment>
            ) : null;

          return (
            <div className="App">
              <Tabs
                defaultActiveKey="1"
                centered
                onChange={(key) => this.onTabChange(key, fetchRatedMovies, fetchMovies)}
              >
                <TabPane tab="Search" key="1">
                  {spiner}
                  {showError}
                  {content}
                </TabPane>
                <TabPane tab="Rated" key="2">
                  {spiner}
                  {showError}
                  {ratedContent}
                </TabPane>
              </Tabs>
            </div>
          );
        }}
      </MoviesServiceContext.Consumer>
    );
  }
}

export default App;
