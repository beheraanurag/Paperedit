# Database Seed Script

This directory contains the database seed script to populate the database with test users.

## Test Users

The seed script creates the following test accounts:

### Regular User
- **Email**: `test@example.com`
- **Password**: `test123`
- **Role**: `user`

### Admin User
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: `admin`

## Usage

1. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

2. The database file (`database.sqlite`) will be created automatically in the project root when you first run the application or seed script.

3. Run the seed script:
   ```bash
   npm run seed
   ```

   The database file will be created at `database.sqlite` in the project root (or the path specified in `DATABASE_PATH` environment variable).

The script will:
- Check if users already exist (skips if they do)
- Create test users with hashed passwords
- Display the credentials after completion

## Notes

- The script is idempotent - it won't create duplicate users if they already exist
- Passwords are hashed using bcrypt before being stored
- User IDs are generated using nanoid
