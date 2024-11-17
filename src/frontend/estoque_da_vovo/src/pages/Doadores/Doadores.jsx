import BreadCrumbNav from "../../components/BreadCrumbNav/BreadCrumbNav.jsx";
import Btn from "../../components/Btn/Btn.jsx";
import TitleContent from "../../components/TitleContent/TitleContent.jsx";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { dataDoador } from "../../data/constants.js";

export default function Doadores() {
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/doadores/novo-doador");
    };

    function handleRowClick(itemId) {
        console.log("ID clicado:", itemId);
        alert(`ID do item clicado: ${itemId}`);
    }

    function handleSelectionChange(selectedIds) {
        console.log("IDs selecionados:", selectedIds);
    }
    return (
        <>
            <BreadCrumbNav />
            <TitleContent title={"Doadores"}/>
            <Btn text={"Novo Doador"} icon={<FontAwesomeIcon icon={faPlus} />} onClick={handleClick} />
            <TableComponent items={dataDoador} onRowClick={handleRowClick} onSelectionChange={handleSelectionChange} />
        </>
    );
}