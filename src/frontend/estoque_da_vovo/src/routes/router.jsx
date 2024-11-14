import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Doacao from "../pages/Doacao/Doacao.jsx";
import Estoque from "../pages/Estoque/Estoque.jsx";
import Historico from "../pages/Historico/Historico.jsx";
import Relatorio from "../pages/Relatorio/Relatorio.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";

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
        path: "/doacao",
        element: <Doacao />,
      },
      {
        path: "/estoque",
        element: <Estoque />,
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
