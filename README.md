# Plataforma de Eventos e Oficinas Acadêmicas — Backend

Projeto Prático Final da disciplina de Desenvolvimento Web Back-end, do curso
de Tecnologia em Sistemas para Internet do IFRN — Campus Currais Novos.

## 1. Problema e proposta

Instituições de ensino costumam promover palestras, minicursos e oficinas ao
longo de eventos acadêmicos maiores, mas a organização de inscrições, controle
de vagas e acompanhamento de atividades geralmente é feita de forma manual ou
espalhada em planilhas.

Este projeto propõe uma API REST para uma **plataforma de eventos e oficinas
acadêmicas**, permitindo cadastrar eventos, vincular atividades (palestras,
minicursos e oficinas) a cada evento e gerenciar os usuários que participam
dessas atividades.

O domínio contempla três recursos principais, além de uma relação direta entre
dois deles: cada **atividade** pertence a um **evento** (`id_evento`),
representando oficinas, palestras e minicursos organizados dentro de um evento
maior.

## 2. Integrantes e responsabilidades

| Integrante | Responsabilidade principal |
|---|---|
| Matheus Iago | Módulos, services e regras de negócio da aplicação |
| Jardel Bezerra | Interface frontend da aplicação |
| Josicleiton | DTOs e validações (`class-validator`) dos módulos de **Eventos** e **Atividades** |
| Jhonata | DTOs e validações (`class-validator`) do módulo de **Usuários** |

Todos os integrantes participaram das decisões técnicas do grupo e acompanham
o funcionamento geral da aplicação.

> **Observação sobre o escopo:** conforme orientação do professor, esta etapa
> do projeto **dispensa a implementação de autenticação com JWT e de banco de
> dados**. Por isso, a persistência atual é feita em memória (arrays dentro
> dos services), servindo como base para a evolução da aplicação nas próximas
> etapas.

## 3. Arquitetura

A aplicação é construída em **NestJS**, organizada em módulos por domínio, cada
um seguindo o padrão `controller` → `service` → `DTOs`:

```
src/
├── app.module.ts          # módulo raiz, importa os demais módulos
├── main.ts                 # bootstrap da aplicação e ValidationPipe global
├── eventos/
│   ├── eventos.controller.ts
│   ├── eventos.service.ts
│   ├── eventos.module.ts
│   └── dto/
│       ├── create-evento.dto.ts
│       └── update-evento.dto.ts
├── atividades/
│   ├── atividades.controller.ts
│   ├── atividades.service.ts
│   ├── atividades.module.ts
│   └── dto/
│       ├── create-atividade.dto.ts
│       └── update-atividade.dto.ts
└── usuarios/
    ├── usuarios.controller.ts
    ├── usuarios.service.ts
    ├── usuarios.module.ts
    └── dto/
        ├── create-usuario.dto.ts
        └── update-usuario.dto.ts
```

- **Controllers**: responsáveis apenas por receber a requisição, validar
  parâmetros de rota simples (como o `id` numérico) e repassar para o service.
- **Services**: concentram as regras de negócio (busca, criação, atualização
  parcial, remoção) e lançam exceções do NestJS (`NotFoundException`,
  `BadRequestException`) para respostas HTTP coerentes.
- **DTOs**: usam `class-validator` e `class-transformer` para validar e
  transformar os dados recebidos, com mensagens de erro personalizadas.
- **Relação entre recursos**: toda `Atividade` referencia um `Evento` através
  do campo `id_evento`.

### Diagrama simplificado das entidades

```
Evento (1) ────────< (N) Atividade
  id                     id
  titulo                 id_evento (FK)
  descricao              titulo
  data_inicio            descricao
  data_fim                tipo_atividade (Palestra | Minicurso | Oficina)
  local                   data_hora
  tipo                    vagas_totais
  capacidade              local_especifico

Usuario
  id
  nome
  email
  senha
  instituicao
```

## 4. Tecnologias utilizadas

- [NestJS](https://nestjs.com/) 11 (`@nestjs/common`, `@nestjs/core`,
  `@nestjs/platform-express`)
- TypeScript
- `class-validator` e `class-transformer` para validação e transformação de DTOs
- `ValidationPipe` global (`whitelist`, `forbidNonWhitelisted`, `transform`),
  configurado em `main.ts`
- Jest / Supertest para testes unitários e e2e
- Docker e Docker Compose para execução em container

## 5. Endpoints da API

Todas as rotas abaixo respondem em `http://localhost:3030`.

### Eventos (`/eventos`)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/eventos` | Lista todos os eventos |
| GET | `/eventos/buscarPorID/:id` | Busca um evento pelo `id` |
| GET | `/eventos/:titulo` | Busca um evento pelo título |
| POST | `/eventos` | Cria um novo evento |
| PATCH | `/eventos/:id` | Atualiza parcialmente um evento |
| DELETE | `/eventos/:id` | Remove um evento |

**Corpo de criação (`CreateEventoDto`):** `titulo` (string), `descricao`
(string), `data_inicio` e `data_fim` (data ISO 8601), `local` (string), `tipo`
(string, opcional) e `capacidade` (inteiro ≥ 1, opcional).

### Atividades (`/atividades`)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/atividades` | Lista todas as atividades |
| GET | `/atividades/buscarPorID/:id` | Busca uma atividade pelo `id` |
| GET | `/atividades/:titulo` | Busca uma atividade pelo título |
| POST | `/atividades` | Cria uma nova atividade vinculada a um evento |
| PATCH | `/atividades/:id` | Atualiza parcialmente uma atividade |
| DELETE | `/atividades/:id` | Remove uma atividade |

**Corpo de criação (`CreateAtividadeDto`):** `id_evento` (número, obrigatório),
`titulo` (string, até 80 caracteres), `descricao` (string), `data_hora` (data
ISO 8601), `vagas_totais` (inteiro), `local_especifico` (string, até 80
caracteres) e `tipo_atividade` (enum: `Palestra`, `Minicurso` ou `Oficina`).

### Usuários (`/usuarios`)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuarios` | Lista todos os usuários |
| GET | `/usuarios/buscarPorID/:id` | Busca um usuário pelo `id` |
| GET | `/usuarios/:nome` | Busca um usuário pelo nome |
| POST | `/usuarios` | Cadastra um novo usuário |
| PATCH | `/usuarios/:id` | Atualiza parcialmente um usuário |
| POST | `/usuarios/login` | Valida `email` e `senha` de um usuário |
| DELETE | `/usuarios/:id` | Remove um usuário |

**Corpo de criação (`CreateUsuarioDto`):** `nome` (string, até 50 caracteres),
`email` (formato válido, até 80 caracteres), `senha` (string, até 50
caracteres) e `instituicao` (string, até 80 caracteres).

Todas as rotas que recebem `:id` validam se o parâmetro é numérico e retornam
`400 Bad Request` quando não é. Buscas sem resultado retornam
`404 Not Found`, e o `ValidationPipe` global rejeita automaticamente
(`400 Bad Request`) qualquer campo enviado no corpo da requisição que não
esteja previsto no DTO correspondente.

## 6. Como executar o projeto

### 6.1 Localmente com Node.js

Pré-requisitos: Node.js 20+ e npm.

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento (watch mode)
npm run start:dev

# build de produção
npm run build
npm run start:prod
```

A aplicação sobe, por padrão, na porta `3030` (configurável pela variável de
ambiente `PORT`).

### 6.2 Com Docker

Pré-requisitos: Docker e Docker Compose.

```bash
docker compose up --build
```

O serviço `api` é publicado em `http://localhost:3030`, com o código-fonte
montado como volume para refletir alterações em tempo real (`start:dev`).

### 6.3 Testes

```bash
# testes unitários
npm run test

# testes end-to-end
npm run test:e2e

# cobertura de testes
npm run test:cov
```

## 7. Variáveis de ambiente

O projeto ainda não depende de variáveis de ambiente obrigatórias, já que
persistência em banco de dados e autenticação com JWT foram dispensadas nesta
etapa. A única variável reconhecida atualmente é:

| Variável | Descrição | Padrão |
|---|---|---|
| `PORT` | Porta em que a API é executada | `3030` |

## 8. Decisões técnicas

- **Persistência em memória:** como o professor dispensou o uso de banco de
  dados e autenticação JWT nesta etapa, os dados de eventos, atividades e
  usuários são mantidos em arrays dentro dos respectivos services, reiniciando
  a cada execução da aplicação.
- **Validação centralizada:** o `ValidationPipe` global em `main.ts` garante
  que toda a API valide, transforme e rejeite campos não previstos, mantendo o
  comportamento consistente entre os módulos de Eventos, Atividades e
  Usuários.
- **Divisão de responsabilidades:** os DTOs e validações de cada módulo foram
  divididos entre os integrantes (Eventos/Atividades e Usuários), enquanto a
  lógica de módulos, services e regras de negócio ficou concentrada em outra
  dupla, conforme a tabela de responsabilidades da seção 2.

## 9. Deploy

A API está publicada no [Render](https://render.com/), em:

**Interface:**
**https://interface-academo.onrender.com/**

**Serviço:**
**https://academo.onrender.com**

O ambiente publicado conta com verificação de saúde (health check) e
evidências de monitoramento da execução, conforme exigido pelo projeto.

## 10. Decisões de escopo assumidas pela equipe

- **Sem integração com API externa:** a equipe optou por não implementar
  consumo de API externa nesta entrega, priorizando a consolidação dos
  módulos de Eventos, Atividades e Usuários.
- **Upload de arquivos:** será implementado assim que a interface Web
  (frontend) estiver pronta, já que o upload depende do formulário do lado do
  cliente para envio via `multipart/form-data`.

## 11. Próximos passos

Itens do escopo do projeto final ainda pendentes: implementação de autenticação dos usuários.
