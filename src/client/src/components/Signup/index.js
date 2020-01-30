import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import FadeIn from 'react-fade-in'

class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    // need to update to getDerivedStateFromProps
    UNSAFE_componentWillReceiveProps(nextProps) {
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(newUser, this.props.history)
    }

    render() {
        const { errors } = this.state
        
        return(
            <Form onSubmit={this.onSubmit} style={{ maxWidth: '400px', margin: '100px auto' }}>
                <FadeIn>
                <h1>Thanks for Joining Us!</h1>
                <br />
                <h3>Sign Up</h3>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' onChange={this.onChange} value={this.state.name} isInvalid={errors.name} type="name" placeholder="Enter Name" />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' onChange={this.onChange} value={this.state.email} isInvalid={errors.email} type="email" placeholder="Enter Email" />
                    {errors.email ? 
                        <Form.Control.Feedback type='invalid'>
                            {errors.email}
                        </Form.Control.Feedback>
                    :
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else. <span aria-labelledby='celebration emoji' role='img'>🥳</span>
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' onChange={this.onChange} value={this.state.password} isInvalid={errors.password} type="password" placeholder="Password" />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPassword2">
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control name='password2' onChange={this.onChange} value={this.state.password2} isInvalid={errors.password2} type="password" placeholder="Confirm Password" />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password2}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button block variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form.Group>
                <Form.Group>
                    <Form.Text>
                        <Link to='/login'>Already a User? Please Sign In Here.</Link>
                    </Form.Text>
                </Form.Group>
                </FadeIn>
            </Form>
        )
    }
}

Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Signup));
