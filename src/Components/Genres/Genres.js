import React, { Component } from "react";
import { Tag } from "antd";
import "antd/dist/antd";
import "./Genres.css";

export default class Genres extends Component {
  render() {
    const genres = [{name: 'Drama'}, {name: 'Action'}]
    return (
      <div className="genres-container">
        {genres.map((genre) => (
          <Tag className="genre-tag">
            {genre.name} 
          </Tag>
        ))}
      </div>
    );
  }
}