# 4 Avaliação Crítica dos Resultados

Apresentem de forma resumida os principais pontos positivos e negativos da arquitetura proposta. Adotem uma postura crítica que permita entender as limitações arquiteturais, incluindo os prós e contras das tecnologias. Vocês podem utilizar o formato textual ou produzir um quadro resumo, que é recomendável.

**Exemplo de quadro resumo:**

| Ponto avaliado    | Descrição                   |
|-------------------|-----------------------------|
| Escalabilidade | A arquitetura proposta permite fácil escalabilidade horizontal devido ao uso de contêineres e microsserviços, mas pode enfrentar desafios de orquestração em larga escala. Tendo um olhar para o que o serviço se propõe, o problema de larga escala é pouco provável. |
| Manutenibilidade | A separação em serviços distintos facilita a manutenção, mas aumenta a complexidade do gerenciamento.                         |
| Desempenho | O uso de tecnologias modernas como Node.js e PostgreSQL oferece bom desempenho, mas o desempenho pode ser afetado por consultas complexas e volume de dados elevado. No caso do asilo é pouco provável que o mesmo aconteça por se tratar de um sistema de pequeno porte.                      |
| Segurança               | A arquitetura permite boas práticas de segurança como autenticação e controle de acesso, mas depende da correta configuração de cada serviço.                       |
| Custo              | O uso de soluções de hospedagem gratuitas reduz custos iniciais, mas pode limitar recursos e suporte técnico.                       |
| Flexibilidade Tecnológica               | A integração de tecnologias como Docker e React oferece flexibilidade, mas teria que ser feita através da orquestração de containers do backend e frontend, o que acabou dificultando o desenvolvimento por nem toda a equipe ter conhecimento prévio da integração.                     |
| Resiliência              | A arquitetura distribui falhas potencialmente críticas, mas requer monitoramento contínuo para garantir a alta disponibilidade, o que pode ser um problema tendo em vista que a utilização vai ser feita por gerentes do asilo que não tem o contato com a tecnologia e esse requerimento pode acabar sendo um problema.                        |
| Facilidade de Implementação              |Tecnologias amplamente suportadas e documentadas facilitam a implementação, mas a integração completa foi dificultada pela complexidade do programa, pouca experiência da equipe com todas as tecnologias e pelo pouco tempo para implementação.                       |

