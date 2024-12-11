# Instruções de como atualizar o banco de dados a partir do código.
--------------------------------------------------------------------
* npx sequelize-cli db:migrate > executar no cd backend
* migrations > arquivo com a estrutura que vai ser criada no banco
* caso utilizar o arquivo de 29/11 (ou qualquer arquivo já usado), é necessário desfaze-lo com npx sequelize-cli db:migrate:undo
* novos arquivos podem ser feitos para criar novas tabelas, etc