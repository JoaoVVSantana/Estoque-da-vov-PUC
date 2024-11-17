import BreadCrumbNav from "../../components/BreadCrumbNav/BreadCrumbNav.jsx";
import TitleContent from "../../components/TitleContent/TitleContent.jsx";
import FormDoador from "./FormDoador/FormDoador.jsx";

export default function NovoDoador() {
    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Criando Novo Doador"} />
            <FormDoador/>
        </>
    );
}