-- Database: lardavovo

--Não precisamos usar pq o sequelize faz isso

CREATE DATABASE lardavovo
    WITH
    OWNER = lardavovo1
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF8'
    LC_CTYPE = 'en_US.UTF8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

ALTER DATABASE lardavovo
    SET "TimeZone" TO 'utc';

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON TABLES TO lardavovo1;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON SEQUENCES TO lardavovo1;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT EXECUTE ON FUNCTIONS TO lardavovo1;

CREATE TABLE item(
	id_item INT NOT NULL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	descricao TEXT NOT NULL,
	categoria VARCHAR(255) NOT NULL,
	quantidade INT NOT NULL,
	previsaoTermino INT NOT NULL,
	validade DATE NOT NULL,
	gastoDiario INT NOT NULL,
	date DATE NOT NULL
);

insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (41, 'Vicks DayQuil and Vicks NyQuil', 'Person on outside of car injured in collision w car nontraf', 'Acetaminophen, Phenylephrine Hydrochloride, Dextromethorphan Hydrobromide, Acetaminophen, Doxylamine Succinate, and Dextromethorphan Hydrobromide', 11, 7, '8/1/2024', 39, '10/2/2024');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (10, 'Fenofibrate', 'Poisoning by aspirin, accidental (unintentional), init', 'FENOFIBRATE', 29, 8, '11/12/2024', 40, '9/7/2024');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (63, 'Oyster', 'Nondisp avulsion fracture of right ischium, init for opn fx', 'Oyster', 44, 44, '6/5/2024', 61, '12/23/2023');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (52, 'AMARYL', 'Mycosis fungoides, intra-abdominal lymph nodes', 'glimepiride', 38, 95, '7/15/2024', 33, '5/5/2024');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (77, 'GABA Phenolic', 'Candidal meningitis', 'Gamma-aminobutyric acid,', 20, 55, '11/2/2024', 95, '9/22/2024');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (20, 'Lemon', 'Atheroembolism of unspecified upper extremity', 'Lemon', 86, 76, '6/28/2024', 54, '3/26/2024');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (35, 'erythromycin', 'Burns involving 80-89% of body surface', 'erythromycin', 71, 92, '3/6/2024', 13, '9/17/2024');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (25, 'Arneu', 'Maternal care for (suspected) cnsl malform in fetus, fetus 5', 'Camphor Menthol', 76, 50, '5/3/2024', 40, '10/3/2024');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (88, 'Buspirone Hydrochloride', 'Hit by fall object due to acc to oth powered wtrcrft, init', 'buspirone hydrochloride', 9, 93, '11/17/2023', 40, '7/21/2024');
insert into item (id_item, nome, descricao, categoria, quantidade, previsaotermino, validade, gastodiario, date) values (65, 'Stool Softener', 'Nondisp suprcndl fx w intrcndl extn low end r femr, 7thE', 'DOCUSATE SODIUM', 49, 52, '8/13/2024', 42, '1/4/2024');
