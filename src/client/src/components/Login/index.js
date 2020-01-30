import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import FadeIn from 'react-fade-in'

class Login extends React.Component {
    constructor() {
        super() 
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/home')
        }
    }

    // need to update to getDerivedStateFromProps
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/home')
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData)
    }

    render() {
        const { errors } = this.state

        return(
            <Form onSubmit={this.onSubmit} style={{ maxWidth: '400px', margin: '100px auto' }}>
                <FadeIn>
                <h1>Hello, Welcome Back</h1>
                <br />
                <h3>Login</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' onChange={this.onChange} value={this.state.email} isInvalid={errors.email} type="email" placeholder="Enter email" />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' onChange={this.onChange} value={this.state.password} isInvalid={errors.password} type="password" placeholder="Password" />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button block variant="primary" type="submit">
                        Login
                    </Button>
                </Form.Group>
                <Form.Group>
                    <Form.Text>
                        <Link to='/signup' >New to us? Please, Sign Up Here.</Link>
                    </Form.Text>
                </Form.Group>
                </FadeIn>
            </Form>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps, 
    { loginUser }
)(Login)
