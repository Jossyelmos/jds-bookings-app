import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../helper/utils';
import { createRoom, reset } from '../features/room/roomSlice';

const CreateRoom = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isSuccess } = useSelector((state) => state.room);

    const [files, setFiles] = useState('');
    const [formData, setFormData] = useState({
        name: "test",
        price: 200,
        desc: "great",
        roomNumbers: "401, 203, 232, 234",
    });

     const { name, price, desc, roomNumbers } = formData;

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    useEffect(() => { 
        if (isSuccess) {
            dispatch(reset());
            navigate('/rooms');
        }
    }, [isSuccess]);
    
    const handleChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
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

        let list = [];
        list = await Promise.all(Object.values(files).map(async (file) => {
            const url = await uploadImage(file);
            return url;
        }))

        const dataToSubmit = {
            name,
            price,
            desc,
            roomNumbers: roomArray,
            image: list
        };

        // dispatch dataToSubmit
        dispatch(createRoom(dataToSubmit));
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

  return (
      <div className='container'>
          <h1 className='heading center'>Create Room</h1>

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
                <div className="input-group">
                    <label htmlFor="images">Images</label>
                    <input
                        type="file"
                        name='file'
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
      </div>
  )
}

export default CreateRoom;