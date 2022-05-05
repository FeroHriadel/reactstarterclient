import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { Form, Spinner } from 'react-bootstrap';
import Resizer from 'react-image-file-resizer'; 
import axios from 'axios';



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



const MultipleImageUpload: React.FC<{ values: any, setValues: (newValues: any) => void}> = ({ values, setValues }) => {
    //VALUES
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(UserContext);



    //RESIZE & UPLOAD IMAGE METHOD
    const resizeAndUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    700,
                    700,
                    'PNG',
                    100,
                    0,
                    (uri) => {
                        axios.post(`${process.env.REACT_APP_API}/images/uploadimage`, {image: uri}, {headers: {'Authorization': `Bearer ${user?.token}`}})
                            .then(res => {
                                const uploadedImages = [...values.images];
                                uploadedImages.push(res.data.image);
                                setValues({...values, images: uploadedImages})
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
    }



    //RENDER
    return(
        <React.Fragment>
            {loading && <Spinner animation='border' className='mb-2' />}

            {
                !loading && values.images.length > 0
                &&
                <div 
                    className='img-preview-wrapper'
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}
                >
                    {
                        values.images.map((img: {public_id: string, url: string}) => {
                            <div 
                              className='img-preview' 
                              key={img.public_id}
                              style={{
                                  background: `url(${img.url}) no-repeat center center/cover`,
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '50%',
                                  margin: '0.25rem',
                                  position: 'relative'
                              }}
                            >
                                <p
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        fontSize: '0.5rem'
                                    }}
                                    onClick={() => console.log('delete image')}
                                >
                                    x
                                </p>
                            </div>
                        })
                    }
                </div>
            }

            <Form.Control
                type="file"
                multiple
                accept="images/*"
                onChange={resizeAndUpload}
            />

            {error && <p className='text-center'>{error}</p>}
        </React.Fragment>
    )
}



export default MultipleImageUpload;