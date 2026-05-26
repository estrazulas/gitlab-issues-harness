# Rules

## Criação e atualização de issues

- Toda issue gerada (criação ou download) deve ser armazenada dentro do diretório `data/`.
- Sempre que uma issue nova for criada, o conteúdo deve ser organizado em um diretório com nome no formato `alteracoes_DDMMYYYY` dentro de `data/`.
- Use sempre a data atual para compor o nome do diretório. Exemplo: `data/alteracoes_26052026`.
- Quando houver criação ou atualização de issues, mantenha os arquivos dentro desse diretório datado para facilitar o controle da versão do conteúdo.

- Ao copiar ou arquivar issues para o diretório `data/alteracoes_DDMMYYYY`, faça isso apenas para issues novas (criações). Para atualizações de issues já existentes, atualize o arquivo em `data/issues_markdown` sem criar uma nova cópia datada, salvo quando houver uma solicitação explícita para registrar uma nova versão.

## Placeholder de imagem com valor do .env

- O `src` do bloco de imagem prototipo sugestivo deve vir preenchido com o valor real da variavel `PROJECT_ID` definida no `.env`.
- Não utilizar placeholders como `${PROJECT_ID}` nem deixar o codigo do projeto em branco — o valor deve ser resolvido no momento da redacao da issue.

## Idioma

- Sempre escreva em português do Brasil.
- Ao finalizar qualquer texto de issue ou documentação, use um subagente de revisão para revisar o português antes de considerar o conteúdo concluído.

## Referência de issues em Markdown

- Ao referenciar uma issue em links dentro de arquivos `.md`, use sempre o formato com hashtag e número da issue, por exemplo `#7`.
- Esse formato deve ser mantido para que o GitLab reconheça corretamente a referência automática da issue.

## Symlinks de skills e instruções

- Os diretórios `.claude/skills/`, `.claude/instructions/`, `.github/skills/` e `.github/instructions/` são **symlinks** que apontam para `harness/skills/` e `harness/instructions/`.
- Ao editar uma skill ou instrução, edite sempre o arquivo **real** em `harness/`, nunca o symlink.
- Exemplos de symlinks:
  - `.claude/skills/navigation-paths/SKILL.md` → `harness/skills/navigation-paths/SKILL.md`
  - `.claude/instructions/issues-standard.md` → `harness/instructions/issues-standard.md`
- Para verificar o caminho real: `readlink -f .claude/skills/[nome]/SKILL.md`

## Mermaid

- Sempre que precisar criar um diagrama Mermaid dentro de um arquivo `.md`, utilize um bloco de código.
- O bloco deve seguir este formato exemplo:

```mermaid
flowchart TD
    A([Inicio]) --> B{Possui cadastro?}
    B -- Sim --> C[Fazer login]
    B -- Nao --> D[Cadastrar-se]
    C --> E{Perfil valido?}
    D --> E
    E -- Admin --> F[Painel administrativo]
    E -- Usuario --> G[Pagina inicial]
    F --> H[Gerenciar cadastros]
    F --> I[Relatorios]
    G --> J[Explorar funcionalidades]
    J --> L{Registro disponivel?}
    L -- Sim --> M[Realizar acao]
    L -- Nao --> N[Entrar na fila de espera]
    M --> O([Fim])
    N --> O
    H --> O
    I --> O
```

- Mantenha o conteúdo Mermaid dentro do bloco, sem misturar com texto solto fora dele.
