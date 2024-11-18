import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Doadores from "../pages/Doadores/Doadores.jsx";
import Estoque from "../pages/Estoque/Estoque.jsx";
import Historico from "../pages/Historico/Historico.jsx";
import Relatorio from "../pages/Relatorio/Relatorio.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import NovoProduto from "../pages/NovoProduto/NovoProduto.jsx";
import NovoDoador from "../pages/NovoDoador/NovoDoador.jsx";
import Produto from "../pages/Produto/Produto.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/doadores",
        element: <Doadores />,
      },
      {
        path: "/doadores/novo-doador",
        element:  <NovoDoador />,
      },
      {
        path: "/estoque",
        element: <Estoque />,
      },
      {
        path: "/estoque/novo-produto",
        element:  <NovoProduto />,
      },
      {
        path: "/estoque/produto/:id",
        element:  <Produto />,
      },
      {
        path: "/historico",
        element: <Historico />,
      },
      {
        path: "/relatorio",
        element: <Relatorio />,
      },
    ],
  },
]);

export default router;
