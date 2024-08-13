import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import './room.scss';
import { useDispatch,useSelector } from 'react-redux';
import { reset, deleteRoom } from '../../features/room/roomSlice';

const Room = () => {
  const { user } = useSelector(state => state.auth);
  const { isSuccess } = useSelector(state => state.room);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => { 
    if (isSuccess) {
      navigate('/rooms')
      dispatch(reset());
    }

  }, [isSuccess]);

  useEffect(() => {
    const getRoom = async () => {
      dispatch(reset());
      try {
        const res = await fetch(`/api/rooms/${id}`);

        if (res.ok) {
          const data = await res.json();
          setRoom(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRoom();
  }, []);

  const handleDelete = () => {
    dispatch(deleteRoom(id));
  }

  return (
    <div id='room'>
      <div className="container">
        {room ? <div>
        <div className="img-wrapper">
          <img src={room.image[0]} alt="" />
        </div>
       <div className="text-wrapper">
         <h1 className="heading center">{room.name}</h1>
        <p>{room.desc}</p>
        <h2>${ room.price.toFixed(2)}</h2>
        <div className="cta-wrapper">
            <Link to={`/rooms/edit/${room._id}`}>Edit Room</Link>
            {user?.isAdmin ? <button onClick={handleDelete}>Delete Room</button> : null}
        </div>
       </div>
      </div> : null}
      </div>
    </div>
  )
}

export default Room;