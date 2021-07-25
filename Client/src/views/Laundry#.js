import React, { useState } from 'react';
// react plugin for creating notifications over the dashboard
// reactstrap components
import {
  Button,
  Card,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader,
  CardBody,
  FormText,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import CreateLaundry from '../components/Modals/Modal';

function Laundry() {
  const [laund, setLaund] = useState(true);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prevState) => {
      return !prevState;
    });
  };

  const onCreateLaundry = () => {
    setModal(true);
  };

  return (
    <>
      <div className="content">
        {modal && (
          <CreateLaundry
            modalOpen={modal}
            toggle={toggleModal}
            header="New Complaint"
          >
            <Form>
              <FormGroup>
                <Label for="exampleSelect">Select To</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>caretaker</option>
                  <option>mess-incharge</option>
                  <option>laundry-incharge</option>
                  <option>warden</option>
                </Input>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleFile" sm={2}>
                  Image
                </Label>
                <Col sm={10}>
                  <Input type="file" name="file" id="exampleFile" />
                  <FormText color="muted">
                    If the post contains an image, browse it from your device
                    and upload here. Add images only and not text files.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="problem">Laundry Number</Label>
                <Input />
              </FormGroup>
              <FormGroup>
                <Label for="problem">Phone Number</Label>
                <Input />
              </FormGroup>
              <FormGroup>
                <Label for="hostel">Number of Days</Label>
                <Input />
              </FormGroup>
            </Form>
          </CreateLaundry>
        )}
        <Card body>
          <Row>
            <Col md="10">
              <CardTitle tag="h5">Laundry Receipts</CardTitle>
              <CardText>
                Hope you are having a pleasant experience, promote your Events
                and celebrations here :)
              </CardText>
            </Col>
            <Col md="2">
              <Button onClick={onCreateLaundry}>Create Receipt</Button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default Laundry;
