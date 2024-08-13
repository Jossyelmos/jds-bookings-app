import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { reset, updateRoom } from '../../features/room/roomSlice';
import { useSelector, useDispatch } from 'react-redux';

const EditRoom = () => {
    const dispatch = useDispatch();
    const { isSuccess } = useSelector((state) => state.room);
    const navigate = useNavigate();

    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        desc: '',
        roomNumbers: '',
    });

    const { name, price, desc, roomNumbers } = formData;

    useEffect(() => { 

        const getRoom = async () => {
            try {
                const res = await fetch(`/api/rooms/${id}`);
                const data = await res.json();

                const { roomNumbers, ...rest } = data;
                const roomMap = roomNumbers.map((item) => item.number);
                const roomString = roomMap.join(',');
                setFormData({
                    ...rest,
                    roomNumbers: roomString
                })
            } catch (error) {
                console.log(error);
            }
        }
        getRoom();
    }, []);

    const handleChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
        }));
    };

    useEffect(() => { 
        if (isSuccess) {
            dispatch(reset());
            navigate('/rooms');
        }
    }, [isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !price || !roomNumbers) {
            return;
        }
        
        const roomArray = roomNumbers.split(",").map(item => {
            return {
                number: parseInt(item),
                unavailableDates: [],
            };
        });

        const dataToSubmit = {
            name,
            price,
            desc,
            roomNumbers: roomArray,
            roomId: id,
        };
        
        dispatch(updateRoom(dataToSubmit));
    };

  return (
    <div className='container'>
          <h1 className='heading center'>Edit Room</h1>

          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder='Enter room name'
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        placeholder='Enter price'
                        name='price'
                        value={price}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="desc">Description</label>
                    <textarea
                        name='desc'
                        cols="65"
                        rows={5}
                        value={desc}
                        onChange={handleChange}
                      >
                          
                    </textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="roomNumbers">Room Numbers</label>
                    <textarea
                        name='roomNumbers'
                        placeholder='Enter room numbers seperated by commas eg: 201, 202, 203'
                        cols="65"
                        rows={5}
                        value={roomNumbers}
                        onChange={handleChange}
                    >
                    </textarea>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
      </div>
  )
}

export default EditRoom;