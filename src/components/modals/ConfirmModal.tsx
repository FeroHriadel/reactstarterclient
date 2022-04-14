import React from 'react';
import { Modal, Button } from 'react-bootstrap';



export default function MyVerticallyCenteredModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton />
          
        <Modal.Body className='text-center'>
          <h4>Are you sure?</h4>
          <p>Please confirm</p>
          <Button onClick={props.onHide} className='col-12 m-1'>Close</Button>
          <Button onClick={() => {props.setActionConfirmed(true); props.onHide()}} className='col-12 m-1'>Confirm</Button>
        </Modal.Body>
      </Modal>
    );
  }