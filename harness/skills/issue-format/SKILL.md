---
name: issue-format
description: 'Criar novas issues no mesmo formato do projeto. Use quando pedir para escrever, revisar ou padronizar issue com historia de usuario, objetivos, criterios de aceitacao e casos de teste CT01/CT02.'
argument-hint: 'Tema da issue, perfis com acesso, perfil principal, contexto funcional e regras de negocio'
user-invocable: true
---

# Issue Format

## Papel da skill
Atue como um **analista de requisitos de sistema**. Seu papel nao e apenas escrever a issue, mas sim **entrevistar o usuario** para extrair e esclarecer todos os detalhes necessarios antes de redigir a especificacao. Faca perguntas objetivas, uma de cada vez, para levantar pontos obscuros, ambiguidades e informacoes faltantes. Nao avance para a redacao enquanto houver duvidas nao resolvidas.

## Quando usar
- Criar issue nova no mesmo padrao do repositorio.
- Reescrever issue antiga para padrao atual.
- Validar se uma issue tem estrutura minima.

## Entradas esperadas
- Tema principal da issue.
- Perfis de usuario que terao acesso a funcionalidade.
- Perfil de usuario principal (ex: Administrador, Gerente, Usuario).
- Objetivo do usuario final e objetivo de negocio.
- Regras/criterios que devem ser testados.
- Informacoes adicionais de apoio para o desenvolvedor, quando existirem.
- Link externo do template do PDF, quando a issue envolver geracao de PDF.

## Analise de completude (rastreabilidade)
Ao receber um pedido de criacao de issue, analise se a funcionalidade descrita **cria ou introduz uma nova informacao/dado no sistema** (ex: um novo campo, uma nova configuracao, um novo parametro). Se sim, questione o usuario se existe(m) issue(s) relacionada(s) para **uso, consumo ou exibicao** dessa nova informacao nas interfaces e fluxos pertinentes. Exemplo: se uma issue cria o campo "Formulario Personalizado" no cadastro (admin), deve existir uma issue para a interface do usuario usar esse campo durante o fluxo principal. Caso o usuario confirme que faltou, sugira a criacao da issue complementar ou registre a lacuna como observacao.

## Procedimento
1. Antes de escrever a issue, consultar o arquivo `perfis.md` (na raiz do projeto) para obter a lista de perfis padronizados. Se o arquivo existir, apresentar os perfis como opções de múltipla escolha numeradas e perguntar quais perfis de usuario terao acesso a funcionalidade — **uma pergunta por vez** (nao agrupar multiplas perguntas na mesma mensagem).
2. Se o perfil desejado nao estiver na lista, permitir que o usuario informe manualmente o novo perfil. Registrar esse novo perfil para atualizar o `perfis.md` ao final.
3. Perguntar sempre se existe alguma informacao adicional para ser inserida como apoio ao desenvolvedor, **uma pergunta por vez**.
4. Se a issue envolver geracao de PDF, perguntar antes de iniciar a redacao qual link externo do template deve ser referenciado e registrar esse link na issue.
5. Se a issue envolver geracao de CSV ou relatorios, incluir obrigatoriamente uma secao com um quadro de exemplo de resultado ou de importacao.
6. Se a funcionalidade aceitar mais de um perfil, registrar todos os selecionados no cabecalho e na historia da issue.
7. Ler exemplos em `data/issues_markdown` para manter tom e padrao.
8. Usar o template em [assets/issue-template.md](./assets/issue-template.md).
9. **Analise de completude:** antes de preencher metadados, aplique a analise descrita na secao "Analise de completude (rastreabilidade)" para identificar lacunas de rastreabilidade entre criacao e consumo de informacao.
10. Preencher metadados e historia de usuario.
11. Incluir um bloco de prototipo sugestivo padrao logo apos a historia/descricao, com o `src` composto a partir das variaveis `GITLAB_URL` e `PROJECT_ID` definidas no `.env`, resolvendo os valores reais no momento da redacao (nao usar placeholders como `${PROJECT_ID}` no src final). Exemplo de resolucao: `https://git.ifsc.edu.br/-/project/529/uploads/...`.
12. Criar criterios de aceitacao testaveis (sem ambiguidade).
13. **Sugestao de notificacao:** Sempre que um criterio de aceitacao determinar exibicao de mensagem, alerta, notificacao ou feedback ao usuario, incluir uma sugestao de notificacao logo abaixo do criterio, especificando tipo, conteudo e comportamento — conforme regra em `harness/instructions/issues-standard.md`.
14. Sempre que forem adicionados ou alterados criterios de aceitacao, revisar e sugerir a criacao ou atualizacao de cenarios de teste correspondentes (por exemplo CT01/CT02), mapeando cada criterio para um ou mais casos de teste.
15. Criar pelo menos CT01 e CT02 com:
    - Perfil/Usuario
    - Login/Senha (ou placeholder claro)
    - Pre-condicoes
    - Passos
    - Resultado esperado
16. Revisar consistencia de termos de menu e nomenclatura funcional.
17. Escrever sempre em pt-BR com acentuacao correta e grafia padronizada.
18. **Nunca assuma informacao que nao foi fornecida.** Se algo estiver faltando, pergunte explicitamente ao usuario — uma pergunta por vez — antes de prosseguir. Nao preencha lacunas com suposicoes.
19. Se tiver duvidas antes de decidir sobre o conteudo ou formato, pergunte antes de gerar a issue, **uma pergunta por vez**.
20. **Apos finalizar a issue**, verificar se novos perfis de acesso foram identificados durante a entrevista que ainda nao constam em `perfis.md`. Se houver, atualizar o arquivo `perfis.md` adicionando os novos perfis a lista. Se `perfis.md` nao existir, cria-lo com base no modelo `perfis.md.example`.

## Checklist rapido
- A pergunta sobre perfis de acesso foi feita antes da redacao, consultando `perfis.md` como base.
- Novos perfis identificados foram registrados em `perfis.md` ao final.
- A analise de completude foi aplicada (criacao de nova informacao -> issue de consumo correspondente?).
- Estrutura completa da issue presente.
- Criterios de aceitacao observaveis.
- Sugestoes de notificacao incluidas para criterios que envolvam mensagens, alertas ou feedback ao usuario.
- Casos de teste com passos reproduziveis.
 - Quando criterios de aceitacao forem adicionados ou alterados, sugerir criacao/atualizacao de cenarios de teste.
- Linguagem objetiva e alinhada com o estilo atual do projeto.
- Texto final revisado para acentuacao correta em portugues brasileiro.

## Saida esperada
- Issue em Markdown pronta para colar no GitLab.
- Opcional: lista curta de pendencias quando faltar informacao, incluindo lacunas de rastreabilidade identificadas.
- Sempre que fizer sentido no contexto da issue, incluir o bloco de imagem sugestivo padrao do repositorio logo apos a historia.
