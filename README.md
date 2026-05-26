# GitLab Issues Harness

Modelo de harness para especificação, download e padronização de issues do GitLab, com templates reutilizáveis para agentes Claude e organização centralizada em `harness/`.

## Skills a utilizar

- Use a skill `issue-format` para escrever, revisar ou padronizar issues.
- Use a skill `navigation-paths` para identificar fluxos de navegação, perfis de acesso, logins sugeridos e lacunas de informação.
- Ao trabalhar com navegação, consulte sempre [caminhos.md](caminhos.md) como fonte de verdade.

## Regras gerais

- As issues baixadas do GitLab ficam em `data/issues_markdown/`.
- Issues que não seguem o padrão de nomenclatura vão para `data/outras_issues/`.
- Issues novas criadas via skill são arquivadas em `data/alteracoes_*` (diretório datado).
- Analise apenas issues localizadas em `data/issues_markdown`.
- Não use `data/outras_issues` nem `data/alteracoes_*` como base para análise, padronização ou atualização.
- Sempre escreva especificações em português do Brasil, com ortografia e acentuação corretas.

- Antes de criar, copiar ou atualizar issues, consulte sempre o arquivo de regras em `harness/instructions/copilot-instructions.md` e siga suas diretrizes.

## Criação de caminhos.md e plano de desenvolvimento

- Quando houver necessidade de criar ou atualizar o `caminhos.md` ou `plano-desenvolvimento-issues.md`, utilize os respectivos arquivos de modelo:
  - `caminhos.md.example` como base para `caminhos.md`
  - `plano-desenvolvimento-issues.md.example` como base para `plano-desenvolvimento-issues.md`
- Esses dois arquivos estão no `.gitignore` por conterem dados específicos do projeto. Apenas os `.example` são versionados.

## Plano de desenvolvimento

- Sempre que for solicitada a atualização do plano de desenvolvimento, o arquivo correspondente fica na raiz do projeto em [plano-desenvolvimento-issues.md](plano-desenvolvimento-issues.md).

## Prioridade de leitura

1. Ler `caminhos.md` quando a demanda envolver fluxo, perfil, tela ou navegação.
2. Ler apenas arquivos dentro de `data/issues_markdown` quando a demanda envolver conteúdo de issues.
3. Usar `plano-desenvolvimento-issues.md` quando a demanda envolver planejamento.

## Configuração inicial do projeto

### 1. Instalar dependências

```bash
npm ci
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha as variáveis:

| Variável | Obrigatória | Descrição |
|---|---|---|
| `GITLAB_URL` | Não | URL base da instância do GitLab (ex: `https://gitlab.com/`) |
| `PROJECT_ID` | Sim | ID numérico do projeto no GitLab |
| `PRIVATE_TOKEN` | Sim | Token de acesso pessoal do GitLab com permissão de leitura de issues |
| `ISSUE_LABEL` | Sim | Label do GitLab usada como filtro para baixar apenas issues com essa marcação |
| `ISSUE_FILENAME_PATTERN` | Não | Regex opcional para filtrar arquivos: issues que não correspondem ao padrão vão para `data/outras_issues` |

Após configurar, execute o script de download:

```bash
node baixa-issues.js
```

As issues serão baixadas para o diretório `data/issues_markdown`. Se `ISSUE_FILENAME_PATTERN` estiver definido, issues cujo nome de arquivo não corresponda ao padrão serão movidas para `data/outras_issues`.

### 3. Configurar links simbólicos do Claude

Para que o Claude reconheça as skills e instruções, execute o script de setup:

```bash
chmod +x scripts/setup_claude_symlinks.sh
./scripts/setup_claude_symlinks.sh
```

Isso criará os diretórios `.claude/skills/` e `.claude/instructions/` com links simbólicos apontando para os arquivos reais em `harness/`.

## Estrutura do repositório (visão rápida)

A seguir uma visão resumida dos diretórios e arquivos principais deste workspace e o que eles contêm:

- `README.md`: Este arquivo (visão geral e instruções de uso do projeto).
- `agents.md`: Instruções detalhadas para uso das skills e padrões do projeto.
- `baixa-issues.js`: Script utilitário para baixar ou sincronizar issues do GitLab.
- `caminhos.md`: Descreve fluxos de navegação, telas e perfis — fonte de verdade para caminhos.
- `package.json`: Dependências e scripts do projeto.
- `plano-desenvolvimento-issues.md`: Plano de desenvolvimento e priorização de issues.
- `data/`: Diretório com todos os artefatos de issue (geração e download). Ignorado pelo git.
  - `data/alteracoes_DDMMYYYY/`: Diretórios datados onde novas issues são arquivadas ao serem criadas (histórico de criações).
  - `data/issues_markdown/`: Diretório principal com as issues formatadas em Markdown (fontes a serem analisadas).
  - `data/outras_issues/`: Arquivos e rascunhos que não fazem parte da análise corrente do projeto de IA.
- `harness/`: Diretório central com os arquivos reais de skills e instruções.
- `harness/skills/`: Skills usadas por agentes; ex: `issue-format` e `navigation-paths`.
- `harness/instructions/`: Repositório de padrões e instruções (ex: `issues-standard.md`).
- `.github/skills/`: Symlink para `harness/skills/`.
- `.github/instructions/`: Symlink para `harness/instructions/`.
- `.claude/skills/`: Symlink para `harness/skills/`.
- `.claude/instructions/`: Symlink para `harness/instructions/`.

Use esta seção como referência rápida; consulte os arquivos específicos quando for necessário trabalhar em um item.

## Versionamento independente do diretório `data/`

O diretório `data/` é ignorado pelo `.gitignore` do repositório raiz. Isso permite versioná-lo de forma separada — útil para armazenar as issues geradas em um repositório interno (ex: GitLab) enquanto o código do harness permanece no GitHub.

Para configurar:

```bash
# 1. Acessar o diretório data
cd data/

# 2. Inicializar um repositório Git separado
git init

# 3. Criar um .gitignore específico para data/
cat > .gitignore << 'EOF'
.gitkeep
EOF

# 4. Adicionar a origem remota (substitua pela URL do seu repositório)
git remote add origin <url-do-repositorio-interno>

# 5. Fazer o primeiro commit
git add .
git commit -m "Initial commit - generated issues"

# 6. Enviar para o remoto
git push -u origin main
```

A partir daí, use `cd data && git <comando>` para operar o repositório de `data/` e `cd .. && git <comando>` para operar o repositório raiz — ambos funcionam de forma independente e aparecem simultaneamente no editor.
