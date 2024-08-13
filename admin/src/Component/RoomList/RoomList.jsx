import React from 'react';
import { Link } from 'react-router-dom';
import './roomList.scss';

const RoomList = ({ data }) => {
  return (
    <div id='room-list'>
        {data.map((item, index) => {
          return (
              <Link to={`/rooms/all/${item._id}`} key={item._id} className='room-unit'>
                <div className="img-wrapper">
                  <img src={item.image[0]} alt="" />
                </div>
                <p className="name">{ item.name}</p>
              </Link>
          )
        })}
    </div>
  )
}

export default RoomList;