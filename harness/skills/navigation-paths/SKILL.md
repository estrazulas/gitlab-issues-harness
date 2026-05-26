---
name: navigation-paths
description: 'Identificar caminhos de navegacao no sistema com base em caminhos.md. Use quando pedir fluxo de tela, menu, perfil recomendado, login sugerido e lacunas de informacao.'
argument-hint: 'Objetivo funcional, perfil desejado (opcional) e contexto da tela'
user-invocable: true
---

# Navigation Paths

## Quando usar
- Usuario pede caminho para chegar em uma funcionalidade.
- Usuario pede qual perfil deve acessar uma tela.
- Usuario pede roteiro de navegacao para teste/validacao.

## Fonte de verdade
- Ler [caminhos.md](../../../caminhos.md) antes de responder.

## Regras de normalizacao
- Formato do caminho: `Entrar -> Menu -> Submenu -> Acao`.
- Usar nomes de menu como aparecem no projeto.
- Quando houver valor variavel, usar marcador em colchetes: `[parametro]`, `[identificador]`, `[registro]`.

## Selecao de perfil
Consulte `caminhos.md` para identificar qual perfil mapeia para cada funcionalidade.
Caso nao encontre, pergunte ao usuario qual perfil deve ser utilizado.

## Informacao faltante
- Se senha nao estiver definida: usar `nao informado`.
- Se algum parametro nao estiver definido: usar marcador variavel.
- Se o caminho for parcial no dataset: marcar explicitamente como `caminho parcial`.

## Formato de saida recomendado
1. Perfil recomendado
2. Credenciais sugeridas
3. Caminho de navegacao
4. Observacoes e dependencias

## Modelo de saida
Use o template em [assets/path-response-template.md](./assets/path-response-template.md).
