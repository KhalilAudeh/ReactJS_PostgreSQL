import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class OppsList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            opps: []
        }
    }

    // MAKE AJAX CALLS HERE
    // componentDidMount is called once the component is actually mounted to the DOM.
    componentDidMount() {
        console.log('COMPONENT HAS MOUNTED')
        var that = this
        fetch('http://localhost:3000/api/opportunities')
            .then(function(res){
                res.json()
                    .then(function(getData){
                        that.setState({
                            opps: getData
                        })
                    })
            })
    }

    // Add Event Handler upon clicking on Add Button
    addOpportunity(event) {
        var that = this
        event.preventDefault()
        console.log('I am in method...')

        let data = {
            id: Math.random(),
            name: this.refs.name.value,
            source: this.refs.source.value,
            info: this.refs.info.value,
            how_to_apply: this.refs.how_to_apply.value
        }

        // 1st parameter: where to go
        // 2nd parameter: configuration object
        var request = new Request('http://localhost:3000/api/new-opportunity', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        })

        // XML HTTP Request
        fetch(request)
            .then(function(res){
                res.json()
                    .then(function(getData){
                        let opps = that.state.opps
                        opps.push(data)
                        that.setState({
                            opps: opps
                        })
                    })
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    // Delete Opportunity
    deleteOpportunity(id) {
        let that = this
        let opportunities = this.state.opps
        let opportunity = opportunities.find(function(opportunity){
            return opportunity.id === id
        })

        var request = new Request('http://localhost:3000/api/delete/' + id, {
            method: 'DELETE'
        })

        fetch(request)
            .then(function(res){
                opportunities.splice(opportunities.indexOf(opportunity), 1)
                that.setState({
                    opps: opportunities
                })
                res.json()
                    .then(function(getData){
                        console.log(getData)
                    })
            })
    }

    render() {
        let opps = this.state.opps
        return(
            <div>
                <button style={{marginLeft:"45%"}} className="btn btn-success">Add Opportunities</button>
                 <Jumbotron className="bg-transparent Jumbotron-fluid p=0">
                    <Container fluid={true}>
                        <Row className="justify-content-center py=5">
                            <Col md={15}>
                                <h3 style={{fontSize:"50px", fontStyle:"italic"}} className="display-2 font-weight-bolder">Creating Opportunity</h3>
                            </Col>
                        </Row>
                    </Container>
                    </Jumbotron>
                <Form style={{marginLeft:"20%",width:"60%"}}>
                <Form.Group>
                    <Form.Label>Opportunity Name</Form.Label>
                    <Form.Control ref="name" type="text" placeholder="Enter name"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Opportunity Source</Form.Label>
                    <Form.Control ref="source" type="text" placeholder="Enter source name"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Info</Form.Label>
                    <Form.Control ref="info" as="textarea" rows="5" placeholder="Enter your message here"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>How to Apply</Form.Label>
                    <Form.Control ref="how_to_apply" as="textarea" rows="5" placeholder="Enter steps of applying"/>
                </Form.Group>
                <Button variant="primary" onClick={this.addOpportunity.bind(this)}>Add</Button>
                </Form>
                <br></br>
                <h3 style={{fontStyle:"italic", marginLeft:"15%"}}> **Opportunities List** </h3>
                <br></br>
                    <Table style={{marginLeft:"20%",width:"60%"}}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Opportunity Name</th>
                                <th>Source</th>
                                <th>More Info</th>
                                <th>How to Apply?</th>
                            </tr>
                        </thead>
                        {opps.map(opp => (
                            <tr key={opp.id}>
                                <td>{opp.id}</td>
                                <td>{opp.name}</td>
                                <td>{opp.source}</td>
                                <td>{opp.info}</td>
                                <td>{opp.how_to_apply}</td>
                                <td>
                                    <button onClick={this.deleteOpportunity.bind(this, opp.id)} className="btn btn-warning">
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
            </div>
        )  
    }
}

export default OppsList
