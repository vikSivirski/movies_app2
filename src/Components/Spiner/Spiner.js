import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

export default class Spiner extends Component {
	render() {
		return (
			<Flex align="center" justify="center" gap="middle">
				<Spin indicator={<LoadingOutlined spin />} size="large" />
			</Flex>
		)
	}
}