import { useParams } from 'react-router-dom';
import FormProduto from '../../components/FormProduto/FormProduto.jsx';
import TitleContent from '../../components/TitleContent/TitleContent.jsx';
import useAxios from '../../hooks/useAxios.js';
import { axiosInstanceEstoque } from '../../services/axiosInstance.js';
import BreadCrumbNav from './../../components/BreadCrumbNav/BreadCrumbNav';
import Alert from 'react-bootstrap/Alert';

export default function ProdutoAlterar() {
    const {id} = useParams;

    const [responseData, error, loading, axiosFetch] = useAxios();

    const handleFormSubmit = (data) => {
        console.log("data:", data);
        axiosFetch({
            axiosInstance: axiosInstanceEstoque,
            method: 'post',
            url: 'estoque/inserirItem',
            data: {
                nome: data.nome,
                validade: data.validade,
                tipo: data.categoria,
            },
        });
    }
    console.log("RES:", responseData, error);

    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Criando Novo Produto"} />
            <FormProduto onSubmitForm={handleFormSubmit}/>
            <div className='pt-3 pb-3'>
                {!loading && !error && responseData.message && <Alert variant={"success"}>Produto inserido com sucesso</Alert>}
                {loading && <Alert variant={"primary"}>Carregando...</Alert>}
                {!loading && error && <Alert variant={"danger"}><b>Error ao criar produto na base de dados.</b> Codigo do erro: <i>{error}</i></Alert>}
            </div>

        </>
    );
}