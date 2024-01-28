# Fly.Io

## Lost password

```bash
fly ssh console -a part-13-assignments
```

```bash
echo $OPERATOR_PASSWORD
```

## Proxy

```bash
flyctl proxy 5432 -a part-13-assignments
```

## Database connection fails with localhost

```bash
DATABASE_URL=postgres://postgres:<password>@127.0.0.1:5432/postgres
```
