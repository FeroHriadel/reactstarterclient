import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { Form, Spinner } from 'react-bootstrap';
import Resizer from 'react-image-file-resizer'; 
import axios from 'axios'; //axios is here so you don't have to mess around with FormData to send a file => axios does it for you
import { FaTimes } from 'react-icons/fa';



/*
Resizer.imageFileResizer(
  file, // Is the file of the image which will resized.
  maxWidth, // Is the maxWidth of the resized new image.
  maxHeight, // Is the maxHeight of the resized new image.
  compressFormat, // Is the compressFormat of the resized new image.
  quality, // Is the quality of the resized new image.
  rotation, // Is the degree of clockwise rotation to apply to uploaded image.
  responseUriFunc, // Is the callBack function of the resized new image URI.
  outputType, // Is the output type of the resized new image.
  minWidth, // Is the minWidth of the resized new image.
  minHeight // Is the minHeight of the resized new image.
);
*/



const SingleImageUpload: React.FC<{ values: any, setValues: (newValues: any) => void}> = ({ values, setValues }) => {
    //VALUES
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(UserContext);



    //REMOVE IMAGE METHOD
    const removeImage = (public_id: string) => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API}/images/removeimage`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user!.token}`
            },
            method: 'POST',
            body: JSON.stringify({public_id})
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data && data.error) {
                    setLoading(false);
                    setError(`Image removal failed: ${data.error}`);
                    setTimeout(() => {setError('')}, 2000);
                } else {
                    setValues({...values, image: {public_id: '', url: ''}});
                    setLoading(false);
                    setError('Image Removed');
                    setTimeout(() => {setError('')}, 1500);
                }
            })
    }



    //RESIZE & UPLOAD IMAGE METHOD
    const resizeAndUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setLoading(true);
            Resizer.imageFileResizer(
                files[0],
                700,
                700,
                'PNG',
                100,
                0,
                (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/images/uploadimage`, {image: uri}, {headers: {'Authorization': `Bearer ${user?.token}`}})
                        .then(res => {
                            setValues({...values, image: res.data.image});
                            setLoading(false);
                        })
                        .catch(error => {
                            if (error.response) {
                                setLoading(false);
                                setError(error.response.data.error);
                                setTimeout(() => {setError('')}, 2000);
                            } else {
                                setLoading(false);
                                setError('Image upload failed');
                                setTimeout(() => {setError('')}, 2000);
                            }
                        })
                },
                'base64'
            )
        }
    }



    //RENDER
    return(
        <React.Fragment>
            {loading && <div><Spinner animation='border' className='mb-2' /></div>}

            {
                !loading && values.image && values.image.url
                &&
                <div 
                    className='img-preview'
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: `url(${values.image.url}) no-repeat center center/cover`,
                        position: 'relative',
                        margin: '0.25rem'
                    }}
                >
                    <div
                        className='remove-img-btn'
                        onClick={() => removeImage(values.image.public_id)}
                        style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            background: '#333',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            cursor: 'pointer'
                        }}
                    >
                        <p style={{color: 'white', pointerEvents: 'none', fontSize: '0.75rem', margin: 0, padding: 0, lineHeight: '1'}}>
                            <FaTimes />
                        </p>
                    </div>
                </div>               
            }

            <div className='label-wrapper'>
            <Form.Label htmlFor='images' style={{
                height: 48,
                background: '#1a1a1a',
                display: 'flext',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                cursor: 'pointer',
                lineHeight: '48px',
                textAlign: 'center',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '0.9rem'
            }}>
                Upload Image
            </Form.Label>
            </div>
            <Form.Control
                    type="file"
                    accept="images/*"
                    onChange={resizeAndUpload}
                    name='images'
                    id='images'
                    hidden
                />

            {error && <p className='text-center'>{error}</p>}
        </React.Fragment>
    )
}



export default SingleImageUpload;