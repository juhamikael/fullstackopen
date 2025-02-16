# Todo App with Docker


## Start in development mode:
```bash
docker compose -f docker-compose.dev.yml up --build -d
```

Navigate to http://localhost:8080 to see the app.

### Clean up development environment:
```bash
docker compose -f docker-compose.dev.yml down --rmi local
# Remove everything + volumes
# docker compose -f docker-compose.dev.yml down -v --rmi local
```

Verify nothing is running for this project
```bash
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs
```

## Start in production mode:
```bash
docker compose -f docker-compose.yml up --build -d
```

Navigate to http://localhost to see the app.


### Clean up production environment:
```bash
docker compose -f docker-compose.yml down --rmi local
# Remove everything + volumes
# docker compose -f docker-compose.yml down -v --rmi local
```

## Verify the app is running / everything is cleaned up correctly


**Production environment**
```bash
docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs
```

**Development environment**
```bash
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs
```

