# Database Seeders

This directory contains Sequelize database seeders that populate the database with default data.

## Available Seeders

### 1. Default Roles (20240602000001-create-default-roles.js)
Creates three default roles:
- **SUPER_ADMIN**: Full system access
- **ADMIN**: Full backup and schedule management
- **VIEWER**: Read-only access

### 2. Default Users (20240602000002-create-default-users.js)
Creates two default user accounts:
- **Admin User**: `admin@dbbackup.com` / `Admin@123456` (SUPER_ADMIN role)
- **Viewer User**: `viewer@dbbackup.com` / `Viewer@123456` (VIEWER role)

⚠️ **IMPORTANT**: Change these default passwords in production!

### 3. Default Storage Provider (20240602000003-create-default-storage-provider.js)
Creates a default local storage provider configured to store backups in `./backups`

## Running Seeders

### Run all seeders
```bash
npm run seed
```

### Run specific seeder
```bash
npx sequelize-cli db:seed --seed 20240602000001-create-default-roles.js
```

### Undo all seeders
```bash
npx sequelize-cli db:seed:undo:all
```

### Undo specific seeder
```bash
npx sequelize-cli db:seed:undo --seed 20240602000001-create-default-roles.js
```

## Execution Order

Seeders are executed in alphabetical/timestamp order. Ensure they run in this sequence:
1. Roles (must run first)
2. Users (depends on roles)
3. Storage Providers (no dependencies)

## Default Credentials

After running seeders, you can log in with:

| Email | Password | Role |
|-------|----------|------|
| admin@dbbackup.com | Admin@123456 | SUPER_ADMIN |
| viewer@dbbackup.com | Viewer@123456 | VIEWER |

⚠️ **SECURITY WARNING**: 
- Change all default passwords immediately after first login
- Never commit real credentials to version control
- Use environment variables or `.env` file for secrets in production

## Creating New Seeders

To create a new seeder:
```bash
npx sequelize-cli seed:generate --name your-seeder-name
```

This will create a template file in this directory.

## Notes

- All seeders use database transactions for atomicity
- They can be run multiple times (they check for existing data where appropriate)
- Failed seeders will automatically rollback
- Each seeder must be idempotent where possible
