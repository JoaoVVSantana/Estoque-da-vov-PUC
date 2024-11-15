import {
  express,
  sequelize,
  cors,
  itemRoutes,
  doacaoRoutes,
  authRoutes,
  estoqueRoutes,
  autenticarToken,
  app,
  PORT,
  doacao,
  doador,
  item
} from 'src/packages';


sequelize.authenticate().then(() => console.log('Conectado ao BD com sucesso.')).catch((err) => console.error('Não foi possível conectar ao banco de dados:', err));

sequelize.sync(); // Sincronizar com o banco


app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/api/auth', authRoutes); // Autenticacao
app.use('/api/items', autenticarToken, itemRoutes); // Api
app.use('/api/doacoes', autenticarToken, doacaoRoutes);
app.use('/api/estoque', autenticarToken, estoqueRoutes);
app.use('/api/alteracao', autenticarToken, alteracaoRoutes);

app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' })); // Tratamento de erros e de rotas não encontradas

app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});






app.criarDoador = async function (nome,email) {
  const doadorNovo = await doador.create({
    nome: nome,
    email: email,
  });
  return doadorNovo;
}
app.criarItem = async function(nome,quantidade,validade,id_doador) {
  const novoItem = await item.create({
    nome,
    quantidade,
    validade,
    id_estoque,
    id_doador,
  });
  return novoItem;
}

app.criaDoacao = async function (id_doador,id_item,quantidade) {
  const novaDoacao = await doacao.create({
    id_doador,
    id_item,
    quantidade,
    data_doacao: new Date(),
  })
  
}