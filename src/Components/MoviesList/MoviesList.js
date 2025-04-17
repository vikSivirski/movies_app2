import { Component } from 'react';
import { List } from 'antd';

import MoviesListItem from '../MoviesListItem';
import { MoviesServiceContext } from '../../MoviesServiseContext';

export default class MoviesList extends Component {
  render() {
    return (
      <MoviesServiceContext.Consumer>
        {({ moviesData, genresData, onRate, movieRatings }) => (
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
            dataSource={moviesData}
            renderItem={(item) => (
              <List.Item>
                <MoviesListItem
                  movieId={item.id}
                  title={item.original_title}
                  description={item.overview}
                  posterPath={item.poster_path}
                  releaseDate={item.release_date}
                  genresIds={item.genre_ids}
                  genresData={genresData}
                  onRate={(value) => onRate(item.id, value)}
                  ratingValue={movieRatings[item.id]}
                />
              </List.Item>
            )}
          />
        )}
      </MoviesServiceContext.Consumer>
    );
  }
}
