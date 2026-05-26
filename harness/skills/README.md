# Skills do Projeto

Este diretório contém os arquivos **reais** das skills do Claude Code, centralizados no diretório `harness/`.

## Estrutura de symlinks

Os diretórios `.claude/skills/` e `.github/skills/` são symlinks que apontam para cá.

```
.claude/skills/  →  harness/skills/
.github/skills/  →  harness/skills/
```

## Editando uma skill

**Sempre edite o arquivo real em `harness/skills/`, nunca o symlink.**

Para saber o caminho real de uma skill:

```bash
readlink -f .claude/skills/[skill-name]/SKILL.md
```
