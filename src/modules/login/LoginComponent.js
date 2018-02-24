import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Input, Label, FormGroup, Button, Row, Col } from 'reactstrap';
import _ from 'lodash';
import classnames from 'classnames';

import { Translate } from 'components/utils';
import ErrMessage from 'components/errors/ErrMessage';
import logo from 'assets/images/logo.png';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataForm: {
                username: '',
                password: ''
            },
            validationForm: {}
        };
    }

    handleLogin = e => {
        e.preventDefault();
        e.stopPropagation();
        const { dataForm: { username, password } } = this.state;
        const { onSubmit } = this.props;

        onSubmit({ username, password });
    };
    _handleChangeUsername = e => {
        //update value input
        const dataForm = Object.assign({}, this.state.dataForm);
        dataForm.username = e.target.value;
        this.setState({ dataForm });
    };
    _handleChangePassword = e => {
        //update value input
        const dataForm = Object.assign({}, this.state.dataForm);
        dataForm.password = e.target.value;
        this.setState({ dataForm });
    };
    render() {
        return (
            <div className="view">
                <div className="view-content view-pages view-session d-flex justify-content-center page-login ">
                    <div className="container-fluid">
                        <Row>
                            <Col md={{ size: 4, offset: 4 }}>
                                <div className="justify-content-center logo-login">
                                    <img className="img-fluid img-login" src={logo} alt="Logo" />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ size: 4, offset: 4 }} className="form-login">
                                <h3 className="text-uppercase">
                                    <Translate text="login" />
                                </h3>
                                <Form
                                    className="mt-5"
                                    name="loginForm"
                                    id="loginForm"
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={this.handleLogin}
                                >
                                    <FormGroup className="mb-4">
                                        <Label for="email">Email Address</Label>
                                        <Input
                                            required
                                            name="email"
                                            placeholder="abcxyz@gmail.com"
                                            onChange={this._handleChangeUsername}
                                            className={classnames({
                                                'error-input': this.state.validationForm['email']
                                            })}
                                        />
                                        <ErrMessage label="Email" name="email" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup className="mb-4">
                                        <Label for="password">Password</Label>
                                        <Input
                                            required
                                            name="password"
                                            type="password"
                                            onChange={this._handleChangePassword}
                                            placeholder="longsecret"
                                            className={classnames({
                                                'error-input': this.state.validationForm['password']
                                            })}
                                        />
                                        <ErrMessage label="Password" name="password" obj={this.state.validationForm} />
                                    </FormGroup>
                                    <FormGroup className="text-right mb-0">
                                        <Button
                                            type="submit"
                                            className="text-uppercase btn-form btn-login float-right"
                                            disabled={!_.isEmpty(this.state.validationForm)}
                                        >
                                            <Translate text="login" />
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired
    // auth: PropTypes.object.isRequired
};

export default Login;