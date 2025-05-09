import React, { Component } from 'react';
import { Tag } from 'antd';
import 'antd/dist/antd';
import './Genres.css';

export default class Genres extends Component {
  render() {
    const { genresIds, genresData } = this.props;

    const safeGenresIds = Array.isArray(genresIds) ? genresIds : [];
    const safeGenresData = Array.isArray(genresData) ? genresData : [];

    const matchedGenres = safeGenresData
      .filter((genre) => safeGenresIds.includes(genre.id))
      .map((genre) => (
        <Tag key={genre.id} className="genre-tag">
          {genre.name}
        </Tag>
      ));

    return <div className="genres-container">{matchedGenres}</div>;
  }
}
