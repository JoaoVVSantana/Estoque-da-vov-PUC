import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Btn from '../../../components/Btn/Btn.jsx';

import './FormDoador.css'


export default function FormDoador() {

    return (
        <Form className='form-doador'>
            <Row>
                <Form.Group as={Col} xl="6" className='mb-4'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder='"Marcos Silva"' />
                </Form.Group>

                <Form.Group as={Col} xl="6" className='mb-4'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder='"marcos@email.com"' type='email' />
                </Form.Group>

            </Row>

            <Row>
                <div className='d-flex justify-content-center mt-4'>
                    <Btn text={"Criar Doador"} size={"lg"} />
                </div>
            </Row>
        </Form>
    );
}