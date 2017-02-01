import React, { Component } from 'react';

import Item from './Item';


export default class SideItems extends Component {

	render() {


		return (
			<div className="items">
				<div className="wrap">
					<ul>
						<Item
							image="./images/rg3115.jpg"
							active={true}
							onClick={() => { console.log('click') }} />
					</ul>
				</div>
			</div>
		);
	}

}