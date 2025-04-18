import { Component } from 'react';
import { Card, Row, Col, Rate } from 'antd';
import 'antd/dist/antd';
import { format, isValid, parseISO } from 'date-fns';

import './MoviesListItem.css';
import Genres from '../Genres';
import RatingCircle from '../RatingCircle';

export default class MoviesListItem extends Component {
  truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncatedText = text.substring(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    if (lastSpaceIndex === -1) return truncatedText + '...';
    return truncatedText.substring(0, lastSpaceIndex) + '...';
  };

  render() {
    const { title, description, posterPath, releaseDate, genresIds, genresData, onRate, ratingValue } = this.props;
    const truncatedDescription = this.truncateText(description, 200);

    let formattedDate = 'Unknown release date';
    if (releaseDate) {
      const date = parseISO(releaseDate);
      if (isValid(date)) {
        formattedDate = format(date, 'dd MMM yyyy');
      }
    }

    return (
      <Card
        hoverable
        className="card-container"
        style={{ marginBottom: 20, borderRadius: 0 }}
        bodyStyle={{ padding: 0 }}
      >
        <Row>
          <Col xs={24} sm={8} className="poster-wrapper">
            <div className="poster-column">
              <img className="poster-image" src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
              <div className="mobile-info">
                <h2 className="film-title">{title}</h2>
                <p className="release-date">{formattedDate}</p>
                <Genres genresIds={genresIds} genresData={genresData} />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={16} className="content-column" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
            <div className="desktop-info">
              <h2 className="film-title">{title}</h2>
              <p className="release-date">{formattedDate}</p>
              <Genres genresIds={genresIds} genresData={genresData} />
            </div>
            <p className="description">{truncatedDescription}</p>
            <Rate allowHalf count={10} defaultValue={0} value={ratingValue} onChange={onRate} />
          </Col>
          {ratingValue > 0 && <RatingCircle rating={ratingValue} />}
        </Row>
      </Card>
    );
  }
}
