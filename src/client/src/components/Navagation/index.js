import React from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap' 
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { Link } from 'react-router-dom' 
import { LinkContainer } from 'react-router-bootstrap'

class Navagation extends React.Component {
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }
    
    render() {
        const { user } = this.props.auth
        
        return(
            <Navbar bg="primary" variant="dark">
                <Link to='/home'>
                    <Navbar.Brand>Application Name</Navbar.Brand>
                </Link>
                <Nav className="ml-auto">
                    <Nav.Link href="#home">{user.name}</Nav.Link>
                    <LinkContainer to='/page1'>
                        <Nav.Link>Page 1</Nav.Link>   
                    </LinkContainer>
                    <LinkContainer to='/page2'>
                        <Nav.Link>Page 2</Nav.Link>   
                    </LinkContainer>
                </Nav>
                <Button style={{margin: '0 0 0 10px'}} onClick={this.onLogoutClick} variant="outline-light">Logout</Button>
            </Navbar>
        )
    }
}

Navagation.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {  logoutUser }
)(Navagation)
