import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import './FormProduto.css'
import Btn from '../Btn/Btn.jsx';

export default function FormProduto({ isNew = false, onSubmitForm }) {
    const [formData, setFormData] = useState({
        nome: '',
        categoria: 'Higiene',
        validade: '',
        quantidade: 0,
        doador: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        
        setFormData({
            ...formData,
            [name]: type === 'number' ? Number(value) : value, // Converte para número apenas se o tipo for 'number'
        });
    };

    const handleFormSubmit = () => {
        onSubmitForm(formData);
    };

    return (
        <Form className='form-produto'>
            <Row>
                <Form.Group as={Col} xl="6" className='mb-4'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        name="nome"
                        placeholder='"Papel Toalha Interfolha"'
                        value={formData.nome}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xl="6" className='mb-4'>
                    <Form.Label>Nome do Doador (Opcional)</Form.Label>
                    <Form.Control
                        name="doador"
                        placeholder='"Anderson Silva"'
                        value={formData.doador}
                        onChange={handleInputChange}
                    />
                </Form.Group>



                <Form.Group as={Col} xl="6" className='mb-4'>
                    <Form.Label htmlFor="basic-url">Categoria</Form.Label>
                    <InputGroup>
                        <Button variant="none" id="button-addon1">
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Form.Select
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleInputChange}
                        >
                            <option>Higiene</option>
                            <option>Alimentos: Perecível</option>
                            <option>Alimentos: Não Perecível</option>
                            <option>Limpeza</option>
                            <option>Medicamentos</option>
                            <option>Conforto</option>
                            <option>Roupas</option>
                            <option>Lazer</option>
                            <option>Outros</option>
                        </Form.Select>
                    </InputGroup>
                </Form.Group>

            </Row>
            {/*
            <Row >
                <Form.Group as={Col} className='mb-4'>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control placeholder='"Papel Toalha para uso dos banheiros"' />
                </Form.Group>
            </Row>
            */}
            <Row >

                <Form.Group as={Col} md="6" lg="3" xl="3" className='mb-4'>
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                        name='quantidade'
                        placeholder='"28"'
                        type='number'
                        value={formData.quantidade}
                        onChange={handleInputChange} />
                </Form.Group>
                {/*
                <Form.Group as={Col} md="6" lg="3" xl="3" className='mb-4'>
                    <Form.Label>Gasto Diário</Form.Label>
                    <Form.Control placeholder='"5"'  type='number'/>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="3" xl="3" className='mb-4'>
                    <Form.Label>Data</Form.Label>
                    <Form.Control type='date'/>
                </Form.Group>
                 */}
                <Form.Group as={Col} md="6" lg="3" xl="3" className='mb-4'>
                    <Form.Label>Validade</Form.Label>
                    <Form.Control
                        type='date'
                        name="validade"
                        value={formData.validade}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Row>
            <Row>
                {isNew ? <div className='d-flex justify-content-center mt-4'>
                    <Btn text={"Criar Produto"} size={"lg"} onClick={handleFormSubmit} />
                </div> : <div className='d-flex justify-content-center mt-4'>
                    <div className='p-2'>
                        <Btn text={"Deletar"} size={"lg"} />
                    </div>
                    <div className='p-2'>
                        <Btn text={"Atualizar"} size={"lg"} />
                    </div>
                </div>
                }
            </Row>
        </Form>
    );
}