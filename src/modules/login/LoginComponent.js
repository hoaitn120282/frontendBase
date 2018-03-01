import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label, FormGroup, Button, Row, Col } from 'reactstrap';

import { Translate } from 'components/utils';
import logo from 'assets/images/logo.png';
import styles from './style.scss';

class Login extends PureComponent {
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
        const { dataForm } = this.state;
        const { onSubmit } = this.props;

        onSubmit(dataForm);
    };

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ dataForm: { ...this.state.dataForm, [name]: value } });
    };

    render() {
        return (
            <div className={`${styles.pageLogin} d-flex justify-content-center position-relative`}>
                <div className="container-fluid">
                    <Row>
                        <Col md={{ size: 4, offset: 4 }}>
                            <div className={`justify-content-center ${styles.logoLogin}`}>
                                <img className={`img-fluid ${styles.imgLogin}`} src={logo} alt="Logo" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }} className={styles.formLogin}>
                            <h3 className="text-uppercase">
                                <Translate text="login" />
                            </h3>
                            <Form className="mt-5" noValidate autoComplete="off" onSubmit={this.handleLogin}>
                                <FormGroup className="mb-4">
                                    <Label for="email">Email Address</Label>
                                    <Input
                                        type="text"
                                        required
                                        name="username"
                                        placeholder="Username"
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Label>
                                        <Translate text="password" />
                                    </Label>
                                    <Input
                                        required
                                        name="password"
                                        type="password"
                                        onChange={this.onChange}
                                        placeholder="Password"
                                    />
                                </FormGroup>
                                <FormGroup className="text-right mb-0">
                                    <Button type="submit" className={`${styles.btnLogin} text-uppercase float-right`}>
                                        <Translate text="login" />
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default Login;
