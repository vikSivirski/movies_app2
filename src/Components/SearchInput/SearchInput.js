import { Component } from 'react';
import { Input } from 'antd';

export default class SearchInpit extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <Input
        placeholder="Search for movies"
        value={value}
        onChange={(e) => onChange(e)}
        autoFocus
        size="large"
        style={{ marginBottom: 20 }}
      />
    );
  }
}
