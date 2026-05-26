#!/usr/bin/env bash
set -euo pipefail

# Executar a partir da raiz do repositório.
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "Criando links simbólicos em $ROOT_DIR"

# Verifica se o diretório harness existe
if [ ! -d "$ROOT_DIR/harness" ]; then
  echo "ERRO: diretório harness/ não encontrado em $ROOT_DIR"
  echo "Crie o diretório harness com o conteúdo desejado antes de executar este script."
  exit 1
fi

# --- .claude ---
echo ""
echo "[.claude]"

# skills
if [ -e "$ROOT_DIR/.claude/skills" ] || [ -L "$ROOT_DIR/.claude/skills" ]; then
  rm -rf "$ROOT_DIR/.claude/skills"
fi
ln -sf ../harness/skills "$ROOT_DIR/.claude/skills"
echo "  .claude/skills -> ../harness/skills"

# instructions
if [ -e "$ROOT_DIR/.claude/instructions" ] || [ -L "$ROOT_DIR/.claude/instructions" ]; then
  rm -rf "$ROOT_DIR/.claude/instructions"
fi
ln -sf ../harness/instructions "$ROOT_DIR/.claude/instructions"
echo "  .claude/instructions -> ../harness/instructions"

# rules alias
ln -sf instructions "$ROOT_DIR/.claude/rules"
echo "  .claude/rules -> instructions"

# --- .github ---
echo ""
echo "[.github]"

# skills
if [ -e "$ROOT_DIR/.github/skills" ] || [ -L "$ROOT_DIR/.github/skills" ]; then
  rm -rf "$ROOT_DIR/.github/skills"
fi
ln -sf ../harness/skills "$ROOT_DIR/.github/skills"
echo "  .github/skills -> ../harness/skills"

# instructions
if [ -e "$ROOT_DIR/.github/instructions" ] || [ -L "$ROOT_DIR/.github/instructions" ]; then
  rm -rf "$ROOT_DIR/.github/instructions"
fi
ln -sf ../harness/instructions "$ROOT_DIR/.github/instructions"
echo "  .github/instructions -> ../harness/instructions"

# copilot-instructions.md
if [ -e "$ROOT_DIR/.github/copilot-instructions.md" ] || [ -L "$ROOT_DIR/.github/copilot-instructions.md" ]; then
  rm -f "$ROOT_DIR/.github/copilot-instructions.md"
fi
ln -sf ../harness/instructions/copilot-instructions.md "$ROOT_DIR/.github/copilot-instructions.md"
echo "  .github/copilot-instructions.md -> ../harness/instructions/copilot-instructions.md"

echo ""
echo "Pronto. Todos os links apontam para harness/."
