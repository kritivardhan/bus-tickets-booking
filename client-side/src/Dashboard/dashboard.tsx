import React from 'react';
import {Container, Row, Col, Table} from "react-bootstrap";

interface MyProps {

}

interface MyState {
  data: any;
}

class Dashboard extends React.Component<MyProps, MyState> {

    constructor(props){
        super(props)
        this.state = {
            data: JSON.parse(localStorage.getItem("data") || "{}")
        }
    }
    componentDidCatch(){
        const newData = this.state.data.filter(data => data.person);
        this.setState({
            data: newData
        });
    }
    render(): React.ReactNode {
        const {data} = this.state;
        return(
            <Container>
                <Row>
                    <Col>
                        <Table className='text-start'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Seat Number</th>
                                    <th>Date of booking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((e) => {
                                    if(e.person) {
                                        return (
                                            <tr>
                                                <td>{e.person ? (e.person.firstName + " " + e.person.lastName) : ""}</td>
                                                <td>{e.person ? e.person.email : ""}</td>
                                                <td>{e.seatNo ? e.seatNo : ""}</td>
                                                <td>Date</td>
                                            </tr>
                                        );
                                    }
                                    else{
                                        return <></>
                                    }
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }

}
export default Dashboard;