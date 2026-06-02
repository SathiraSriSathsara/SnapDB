# Backend Setup Guide

Complete guide to set up and run the Database Backup Management Platform backend.

## Prerequisites

- Node.js v18+ (LTS)
- npm or yarn
- MySQL 8.0+ database
- Environment variables configured

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Node Environment
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=db_backup

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=7d

# Encryption Configuration
ENCRYPTION_KEY=your-32-character-encryption-key-here

# Email Configuration (Mailtrap for development)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USER=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_FROM=noreply@dbbackup.com

# Backup Configuration
BACKUP_DIR=./backups
MAX_BACKUP_SIZE_GB=10

# Logging
LOG_LEVEL=info
```

## Step 3: Create Database

Create the MySQL database:

```bash
mysql -u root -p -e "CREATE DATABASE db_backup;"
```

## Step 4: Run Database Migrations

Migrations create the database schema:

```bash
npm run migrate
```

This will create all tables:
- Users
- Roles
- UserSessions
- DatabaseServers
- BackupSchedules
- BackupJobs
- BackupFiles
- StorageProviders
- Notifications
- AuditLogs

## Step 5: Run Database Seeders

Seeders populate the database with default data:

```bash
npm run seed
```

This will create:

### Default Roles
- SUPER_ADMIN (full access)
- ADMIN (backup/schedule management)
- VIEWER (read-only)

### Default Users
| Email | Password | Role |
|-------|----------|------|
| admin@dbbackup.com | Admin@123456 | SUPER_ADMIN |
| viewer@dbbackup.com | Viewer@123456 | VIEWER |

### Default Storage
- Local Storage provider configured for `./backups`

⚠️ **IMPORTANT**: Change these default passwords immediately in production!

## Step 6: Verify Setup

Check that everything is configured correctly:

```bash
npm run dev
```

You should see:
```
[nodemon] starting `node server.js`
Server running on port 5000
Database connected successfully
Scheduler initialized
```

Test the health check endpoint:

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-06-02T10:30:45.123Z"
}
```

## Migration Management

### View migration status
```bash
npx sequelize-cli db:migrate:status
```

### Undo last migration
```bash
npx sequelize-cli db:migrate:undo
```

### Undo all migrations
```bash
npx sequelize-cli db:migrate:undo:all
```

## Seeder Management

### View available seeders
```bash
ls seeders/
```

### Run specific seeder
```bash
npx sequelize-cli db:seed --seed 20240602000001-create-default-roles.js
```

### Undo specific seeder
```bash
npx sequelize-cli db:seed:undo --seed 20240602000001-create-default-roles.js
```

### Undo all seeders
```bash
npx sequelize-cli db:seed:undo:all
```

## Development Mode

Run the server with auto-reload:

```bash
npm run dev
```

Features:
- Auto-reload on file changes via Nodemon
- Detailed logging
- Full error stack traces
- Debugger available (port 9229)

## Production Mode

Build and run for production:

```bash
NODE_ENV=production npm start
```

Features:
- Optimized for performance
- Error logging to files
- No auto-reload
- Strict environment validation

## Common Issues and Solutions

### Database Connection Failed
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Module Not Found
- Run `npm install` to ensure all dependencies are installed
- Check for typos in import statements

### Port 5000 Already in Use
- Change PORT in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### Migration Errors
- Check that database credentials are correct
- Ensure database is accessible
- Look at error message for specific table conflicts
- Try: `npm run migrate:undo` then `npm run migrate`

### Default Users Not Created
- Ensure roles are created first: check `Roles` table
- Run seeders in order: roles → users → storage
- Check seeder logs for errors

## Testing

### Run tests
```bash
npm test
```

### Run linting
```bash
npm run lint
```

### Fix linting issues
```bash
npm run lint:fix
```

## Database Backup

### Backup current database
```bash
mysqldump -u root -p db_backup > db_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore database from backup
```bash
mysql -u root -p db_backup < backup_file.sql
```

## Logging

Logs are stored in:
- `logs/all.log` - All logs
- `logs/error.log` - Error logs only

View logs:
```bash
tail -f logs/all.log
```

## API Documentation

API endpoints are documented in `docs/API.md`

Start the server and access:
- Health: `GET /health`
- API Root: `GET /api`

## Next Steps

1. Change default passwords for admin and viewer users
2. Configure email service for production
3. Set up SSL/TLS certificates
4. Configure backup storage providers
5. Set up monitoring and alerting
6. Deploy to production environment

## Support

For issues or questions:
1. Check `docs/` directory
2. Review error logs in `logs/`
3. Check `.env` configuration
4. Verify database connectivity
