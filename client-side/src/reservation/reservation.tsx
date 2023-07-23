import React from 'react';
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import data from "../data.ts"

interface MyProps {

  }
  
  interface MyState {
    data: any;
    show: boolean;
    seatNo: number;
    person: any;
  }
class Reservation extends React.Component<MyProps,MyState> {

    constructor(props){
        super(props)
        this.state = {
            data: data,
            show: false,
            seatNo: 0,
            person: {}
        }
    this.handleClose = this.handleClose.bind(this);
    this.seatSelect = this.seatSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
    }
    seatSelect(seatNo){
        this.setState({
            show: true,
            seatNo: seatNo
        })
    }
    handleClose(){
        this.setState({
            show: false,
            seatNo: 0
        })
    }
    onPersonDetailsChanges(key, value){
        let {person} = this.state;
        person= {...person.key, value}
        this.setState({
            person: person
        })
    }
    handleSave(seatNo){
        let {data} = this.state;
        const newArray = data.map((e) => {
            if(seatNo === e.seatNo){
                return {...e, bookingStatus: true, person: this.state.person}
            }
            return e;
        });
        this.setState({
            data: newArray,
            show: false
        });
        localStorage.setItem("data", JSON.stringify(newArray));

    }
    onChange(event, seatNo){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            person: {...this.state.person, [name]: value } 
        })
    }
    render() {
        const {show, seatNo} = this.state;
        return(
            <Container>
                <Col md="8" className='mx-auto'>
                    <Row>
                        {this.state.data.map((e) => {
                            return (
                            <Col md="2" className='m-3'>
                                <Button className={'seat-selection btn-white w-100' + (e.bookingStatus === true?" selcted":"")} onClick={() => this.seatSelect(e.seatNo)}>{e.seatNo}</Button>
                            </Col>
                            );
                        })}
                    </Row>
                </Col>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Person Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col md="12" className=''>
                            <Row>
                                <Col md="6" className='mb-3'>
                                    <label htmlFor="firstName">First Name</label>
                                    <input id="firstName" name="firstName" type="text" className='form-control' onChange={(e) => {this.onChange(e, seatNo)}}/>
                                </Col>
                                <Col md="6" className='mb-3'>
                                    <label htmlFor="lastName" className=''>Last Name</label>
                                    <input id="lastName" name="lastName" type="text" className='form-control' onChange={(e) => {this.onChange(e, seatNo)}}/>
                                </Col>
                                <Col md="12" className='mb-3'>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" name="email" type="email" className='form-control' onChange={(e) => {this.onChange(e, seatNo)}}/>
                                </Col>
                            </Row>
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className='btn-white' onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleSave(seatNo)}>Save </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }

}
export default Reservation;