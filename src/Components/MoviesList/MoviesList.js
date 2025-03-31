import { Component } from 'react'
import { List } from 'antd'

import MoviesListItem from '../MoviesListItem/MoviesListItem';

export default class MoviesList extends Component {
    render() {
        const {moviesData} = this.props;
        return (
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={moviesData}
                renderItem={item => (
                    <List.Item>
                        <MoviesListItem 
                            title={item.original_title} 
                            description={item.overview} 
                            posterPath={item.poster_path} 
                            releaseDate={item.release_date} 
                        />
                    </List.Item>
                )}
            />
        )
    }
}