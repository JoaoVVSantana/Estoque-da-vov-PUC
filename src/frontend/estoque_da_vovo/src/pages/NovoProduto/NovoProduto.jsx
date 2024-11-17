import FormProduto from './FormProduto/FormProduto.jsx';
import TitleContent from '../../components/TitleContent/TitleContent.jsx';
import BreadCrumbNav from './../../components/BreadCrumbNav/BreadCrumbNav';

export default function NovoProduto() {
    //criar modal/balão de confirmação de novo produto
    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Criando Novo Produto"}/>
            <FormProduto/>
        </>
    );
}