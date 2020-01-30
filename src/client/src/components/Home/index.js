import React from 'react' 
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Home extends React.Component {
    render() {
        const { user } = this.props.auth

        return(
            <div>
                <br />
                <h1 style={{textAlign: 'center'}} >Welcome Back, {user.name} <span role='img' aria-labelledby='happy emoji'>😄</span></h1>
            </div>
        )
    }
}

Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    {  logoutUser }
)(Home)
