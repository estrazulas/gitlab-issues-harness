Este diretório contém a configuração local para uso com Claude.

## Estrutura de dados do projeto

As issues geradas neste projeto são organizadas no diretório `data/` (ignorado pelo git):

- `data/issues_markdown/` — Issues formatadas em Markdown (fonte para análise e edição).
- `data/outras_issues/` — Issues que não seguem o padrão de nomenclatura do projeto.
- `data/alteracoes_*` — Diretórios datados com snapshots de issues novas no momento da criação.

## Links simbólicos

Objetivo:
- Evitar duplicação de arquivos Markdown usando links simbólicos apontando para o diretório `harness/`.

Como usar:
1. Torne o script executável:

```bash
chmod +x scripts/setup_claude_symlinks.sh
```

2. Execute o script a partir da raiz do repositório:

```bash
./scripts/setup_claude_symlinks.sh
```

O script criará os links simbólicos em `.claude/` e `.github/` apontando para `harness/`.

Alias compatível com Claude:
- Alguns fluxos e integrações usam o diretório chamado `rules`. Para compatibilidade, existe um link simbólico `.claude/rules` que aponta para `.claude/instructions`.

Se preferir alterar o comportamento, edite ou remova o link `.claude/rules`.

Se preferir, revise e edite `.claude/config.json` para ajustar caminhos ou opções.
