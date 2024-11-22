# 2 Requisitos
Nesta seção (2) deve-se descrever os requisitos comtemplados na descrição arquitetural, divididos em dois grupos: funcionais e não funcionais. 

## 2.1 Lista de Atores
Estão listados nesta seção os principais atores do sistema e seus principais objetivos: 

* Ator 1: Gerente: usará o sistema para monitorar o estoque do asilo e os produtos em falta, para garantir o bom funcionamento do asilo e otimizar recursos. 

* Ator 2: Voluntário: precisa do sistema como uma forma de registrar e pesquisar rapidamente os produtos, para garantir que tudo será registrado corretamente. 

* Ator 3: Auxiliar de enfermagem: Verificar o estoque e obter relatórios, para monitorar eficientemente os produtos essenciais do asilo. 

* Ator 4: Doadora regular: utilizará o sistema para verificar o relatório de produtos e dar prioridade aos produtos mais urgentes. 

## 2.2 Lista de Funcionalidades
Os requisitos aqui apresentados correspondem às funcionalidades solicitadas pelo parceiro/cliente na visão de negócio, tais como:  

* Cadastrar Produtos e Doações: Registrar novos itens no estoque como de alimentos, produtos de higiene, limpeza, medicamentos e detalhes de doações 

* Gerenciar Estoque: Controlar entradas, saídas e consumo diário de produtos. 

* Notificações de Baixo Estoque e Validade: Alertar sobre falta de produtos e itens próximos da validade. 

* Previsão de Término de Estoque: Calcular quando os produtos acabarão, baseado no consumo diário. 

* Categorização do Estoque: Organizar os itens em categorias como Medicamentos, Alimentos e Limpeza. 

* Controle de Doações: Centralizar a comunicação sobre as necessidades de doações. 

* Identificar Itens que estão Sendo Mais Necessários: Identificar produtos com maior consumo e em falta. 

* Relatórios de Consumo: Gerar relatórios sobre o consumo mensal de itens, entradas e saídas do estoque, doações. 

* Histórico de Doações e Estoque: Manter o registro completo de doações e controle de estoque. 


## 2.3 Requisitos Funcionais


| ID | Descrição Resumida | Dificuldade <br> (B/M/A)* | Prioridade <br> (B/M/A)* |
| -- | ------------------ | -------------------- | ------------------- |
|RF01|Cadastrar Produtos: Permitir o registro de novos produtos no sistema, incluindo nome, categoria, quantidade e validade, gasto diário.|M|A| 
|RF02 |Cadastrar Doações: Registrar informações sobre doações recebidas, incluindo item, quantidade, doador, data de recebimento e validade. |M |A |
|RF03 |Gerenciar Estoque: Centralizar o controle de entradas e saídas de produtos, atualizando as quantidades disponíveis em tempo real.|A |A |
|RF04|Notificação de Validade Próxima: Alertar sobre produtos que estão próximos da data de validade para priorizar o uso ou redistribuição.|M|A|
|RF05|Previsão de Término de Estoque: Calcular e exibir quando o estoque de cada item pode acabar com base no consumo diário.|M|A| 
|RF06 |Categorização de Estoque: Classificar os itens em categorias como Medicamentos, Alimentos, Produtos de Limpeza e Higiênicos etc.|M |M |
|RF07 |Controle de Doações Recebidas: Monitorar e gerenciar a quantidade de doações recebidas e evitar o excesso de produtos.|M ||M |
|RF08|Registro de Quantidade de Idosas que Necessitam de Medicamento: Registrar e monitorar quantas idosas usam cada medicamento específico.|B |B |

*B=Baixa, M=Média, A=Alta.

## 2.4 Requisitos Não Funcionais


| ID | Descrição Resumida | Prioridade <br> (B/M/A)* |
| -- | ------------------ | ------------------------ |
|RNF01| O sistema deve ser acessível nas plataformas web e móvel |A| 
|RNF02| O sistema deve possuir tempo de resposta de até 5 segundos |A|
|RNF03| O sistema deve ser testado em ambiente Docker |A| 
|RNF04| O sistema deve estar disponível para uso em 99% do dia |A| 
|RNF05| O sistema deve ser adaptável à dispositivos móveis |M| 
|RNF06| O sistema deve ter suas funcionalidades básicas (adicionar e remover item do estoque) operadas com até 4 cliques |M|
|RNF07| O sistema deve ser hospedado na nuvem |A| 
|RNF08 |O sistema deve ser adaptável a qualquer navegador web |A| 
|RNF09| O sistema deve exibir relatório de uso todos os meses, no quinto dia útil |M| 
|RNF10| O sistema não deve lidar com nenhum dado sensível |A| 


## 2.5 Descrição Resumida dos Casos de Uso ou Histórias de Usuários


| EU, <br> COMO... <br> PAPEL |  QUERO/PRECISO... <br> FUNCIONALIDADE | PARA... <br> MOTIVO/VALOR |
| ---- | ---- | ---- |
|Maria, Gestora|Como gestora, quero poder comunicar as necessidades do lar para voluntários e doadores de maneira contínua.|Receber doações|
|Joana, enfermeira| Como cuidadora, preciso saber precisamente quais medicamentos estão em falta.| Comprar produtos com eficácia. |
|José, doador| Como doador, preciso saber quais produtos estão em falta e quais possuem em excesso. | Doações que impactem mais positivamente.| 
|Vitor, ajudante de cozinha | Como cozinheiro, preciso saber quais itens estão perto da data de vencimento. | Evitar desperdício. |


## 2.6 Restrições Arquiteturais
* O software deverá ser desenvolvido em Node.JS, utilizando React para o front-end.; 

* O SGBD utilizado deve ser o PostgreSQL; 

* A API desenvolvida deve seguir o padrão RESTful; 

* O código deve ser compartilhado e versionado no GitHub; 

* O deploy e teste deve ser feito em ambiente de contêiner Docker; 

* O sistema não deve gerar custos para ser mantido, por isso a hospedagem em nuvem deve ser gratuita. 

## 2.7 Mecanismos Arquiteturais 

| Análise | Design | Implementação | 
|--- | --- | --- |
| Persistência | ORM | Sequelize |
| Front end | Figma  | React, JavaScript, HTML |
| Back end | Biblioteca JS | Node, com o framework Express |
| Integração | Integração Contínua e Deploy Contínuo (CI/CD)  | GitHub  |
| Teste de Software | Automação de Testes (Unitários, Integração e End-to-End)  | Jest e  Thunderclient  |
| Deploy | Orquestração de Contêineres | Docker |
| API  |  Interface de Comunicação Entre Componentes | RESTful API|
| Arquitetura  | Microserviços | RESTful|
| Hospedagem  | Nuvem | Render |
| Banco de dados  | Relacional | PostgreSQL |
| Tratamento de Exceção   | Tratamento de Erros Centralizado | Sentry |
| Logs  | Logs estruturados | Winston |



