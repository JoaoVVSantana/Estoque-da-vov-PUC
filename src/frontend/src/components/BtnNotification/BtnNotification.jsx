import React, { useState, useEffect } from 'react';
import { Badge, Button, Modal, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import useAxios from '../../hooks/useAxios';
import { axiosInstanceEstoque } from '../../services/axiosInstance.js';
import './BtnNotification.css'

export default function BtnNotification() {
    const [modalShow, setModalShow] = useState(false);

    // Estados para notificações
    const [lotesPoucosItens, setLotesPoucosItens] = useState([]);
    const [itensPertoVencimento, setItensPertoVencimento] = useState([]);
    const [itensVencidos, setItensVencidos] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    // Hook useAxios
    const [responseLotes, errorLotes, loadingLotes, axiosFetchLotes] = useAxios();
    const [responseVencimento, errorVencimento, loadingVencimento, axiosFetchVencimento] = useAxios();
    const [responseVencidos, errorVencidos, loadingVencidos, axiosFetchVencidos] = useAxios();

    // Função para buscar notificações na montagem do componente
    const fetchNotificacoes = async () => {
        try {
            await axiosFetchLotes({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: '/item/lotesComPoucosItens',
            });

            await axiosFetchVencimento({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: '/item/itensPertoDoVencimento',
            });

            await axiosFetchVencidos({
                axiosInstance: axiosInstanceEstoque,
                method: 'GET',
                url: '/item/itensVencidos',
            });
        } catch (err) {
            setAlertMessage('Erro ao carregar notificações.');
        }
    };

    // Requisições são feitas ao montar o componente
    useEffect(() => {
        fetchNotificacoes();
    }, []);

    // Atualizar estados conforme as respostas
    useEffect(() => {
        if (responseLotes?.lotes) {
            setLotesPoucosItens(responseLotes.lotes);
        }
        if (responseVencimento?.alertas) {
            setItensPertoVencimento(responseVencimento.alertas);
        }
        if (responseVencidos?.alertas) {
            setItensVencidos(responseVencidos.alertas);
        }

        if (errorLotes || errorVencimento || errorVencidos) {
            setAlertMessage('Erro ao carregar notificações.');
        }
    }, [responseLotes, responseVencimento, responseVencidos, errorLotes, errorVencimento, errorVencidos]);

    return (
        <>
            {/* Botão de Notificação */}
            <Button
                variant="none"
                onClick={() => setModalShow(true)}
                style={{ position: 'relative', border: 'none', padding: 0 }}
            >
                <FontAwesomeIcon icon={faBell} size="lg" />
                <Badge
                    pill
                    bg="danger"
                    className='notification-badge'
                >
                    {lotesPoucosItens.length + itensPertoVencimento.length + itensVencidos.length || 0}
                </Badge>
            </Button>

            {/* Modal de Notificações */}
            <Modal
                fullscreen="sm-down"
                backdrop="static"
                size="xl"
                show={modalShow}
                onHide={() => setModalShow(false)}
                aria-labelledby="modal"
                centered
            >
                <Modal.Header className='m-header' closeButton>
                    <Modal.Title id="modal">Notificações</Modal.Title>
                </Modal.Header>
                <Modal.Body className='m-body'>
                    {/* Alertas de Erro */}
                    {alertMessage && <Alert variant="danger">{alertMessage}</Alert>}

                    {/* Carregando */}
                    {(loadingLotes || loadingVencimento || loadingVencidos) && (
                        <div className="text-center">
                            <Spinner animation="border" role="status" />
                            <p>Carregando notificações...</p>
                        </div>
                    )}

                    {/* Conteúdo das Notificações */}
                    {!loadingLotes && !loadingVencimento && !loadingVencidos && (
                        <>
                            <h5>Lotes com Poucos Produtos</h5>
                            {lotesPoucosItens.length > 0 ? (
                                <ListGroup className="mb-3">
                                    {lotesPoucosItens.map((lote, index) => (
                                        <ListGroup.Item variant={(index % 2 === 0) ? "secondary" : ""} key={index}>
                                            <b>{lote.nome} - Quantidade: {lote.quantidade}</b>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>Nenhum lote com poucos produtos.</p>
                            )}

                            <h5>Produtos Perto do Vencimento</h5>
                            {itensPertoVencimento.length > 0 ? (
                                <ListGroup className='mb-3'>
                                    {itensPertoVencimento.map((item, index) => (
                                        <ListGroup.Item variant={(index % 2 === 0) ? "secondary" : ""} key={index} className='d-flex'>
                                            <b>{item.conteudo}</b>
                                            <div className='ms-2'><Badge bg="primary" pill>Item ID: {item.itemId}</Badge></div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>Nenhum produto perto do vencimento.</p>
                            )}

                            <h5>Produtos Vencidos</h5>
                            {itensVencidos.length > 0 ? (
                                <ListGroup>
                                    {itensVencidos.map((item, index) => (
                                        <ListGroup.Item variant={(index % 2 === 0) ? "secondary" : ""} key={index}  className='d-flex'>
                                            <b>{item.conteudo}</b>
                                            <div className='ms-2'><Badge bg="danger" pill>Item ID: {item.itemId}</Badge></div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>Nenhum produto vencido.</p>
                            )}
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
