import { Component } from 'react';

import './RatingCircle.css';

export default class RatingCircle extends Component {
  render() {
    const { rating } = this.props;
    const getBorderColor = (rating) => {
      if (rating < 3) return '#E90000';
      if (rating < 5) return '#E97E00';
      if (rating < 7) return '#E9D100';
      return '#66E900';
    };

    const borderColor = getBorderColor(rating);
    return (
      <div className="rating-circle" style={{ borderColor }}>
        <span className="rating-value">{rating}</span>
      </div>
    );
  }
}
