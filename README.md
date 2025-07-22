# Backend - Execução com Docker

Este projeto utiliza **Docker Compose** para construir e executar o backend em ambiente de dev.

---

### 1. Build da aplicação

Execute os seguinte comando para obter as dependências

```bash
docker compose run --rm app install
```
### 2. Adicionar .env na pasta raiz do projeto

```bash
DATABASE_URL=postgresql://nuven:asdfasdf@postgres:5432/nuven
JWT_SECRET=wlf9ungdfvosipu984h3558tgh987hv
PORT=3000

POSTGRES_USER=nuven
POSTGRES_PASSWORD=asdfasdf
POSTGRES_DB=nuven
```

### 3. Subir o backend
```bash
docker compose up
```
### 4. Parar o backend
```bash
docker compose down
```
