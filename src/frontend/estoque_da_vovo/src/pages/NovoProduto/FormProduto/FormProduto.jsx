import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

import Btn from '../../../components/Btn/Btn.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";


import './FormProduto.css'


export default function FormProduto() {

    return (
        <Form className='form-produto'>
            <Row>
                <Form.Group as={Col} xl="6" className='mb-4'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder='"Papel Toalha Interfolha"' />
                </Form.Group>



                <Form.Group as={Col} xl="6" className='mb-4'>
                    <Form.Label htmlFor="basic-url">Categoria</Form.Label>
                    <InputGroup>
                        <Button variant="none" id="button-addon1">
                        <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Form.Select defaultValue="Higiene">
                            <option>Higiene</option>
                            <option>Alimentos</option>
                        </Form.Select>
                    </InputGroup>
                </Form.Group>

            </Row>

            <Row >
                <Form.Group as={Col} className='mb-4'>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control placeholder='"Papel Toalha para uso dos banheiros"' />
                </Form.Group>
            </Row>

            <Row >

                <Form.Group as={Col} md="6" lg="3" xl="3" className='mb-4'>
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control placeholder='"28"' type='number' />
                </Form.Group>

                <Form.Group as={Col} md="6" lg="3" xl="3" className='mb-4'>
                    <Form.Label>Gasto Diário</Form.Label>
                    <Form.Control placeholder='"5"'  type='number'/>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="3" xl="3" className='mb-4'>
                    <Form.Label>Validade</Form.Label>
                    <Form.Control type='date'/>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="3" xl="3" className='mb-4'>
                    <Form.Label>Data</Form.Label>
                    <Form.Control type='date'/>
                </Form.Group>
            </Row>
            <Row>
                <div className='d-flex justify-content-center mt-4'>
                <Btn text={"Criar Produto"} size={"lg"}/>
                </div>
            </Row>
        </Form>
    );
}