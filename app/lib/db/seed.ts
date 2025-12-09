import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { db } from './index.js'
import { users } from './schema.js'
import { eq } from 'drizzle-orm'

const testUsers = [
  {
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User',
    role: 'user' as const,
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
]

async function seed() {
  try {
    console.log('🌱 Starting database seed...')

    for (const userData of testUsers) {
      // Check if user already exists
      const existingUsers = db
        .select()
        .from(users)
        .where(eq(users.email, userData.email))
        .limit(1)
        .all()

      if (existingUsers.length > 0) {
        console.log(`⏭️  User ${userData.email} already exists, skipping...`)
        continue
      }

      // Hash password (bcrypt.hash is async, but we'll await it)
      const hashedPassword = await bcrypt.hash(userData.password, 10)

      // Create user
      const userId = nanoid()
      const user = {
        id: userId,
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        role: userData.role,
      }

      db.insert(users).values(user).run()
      console.log(`✅ Created user: ${userData.email} (${userData.role})`)
    }

    console.log('✨ Database seed completed successfully!')
    console.log('\n📝 Test Credentials:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Regular User:')
    console.log('  Email: test@example.com')
    console.log('  Password: test123')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Admin User:')
    console.log('  Email: admin@example.com')
    console.log('  Password: admin123')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

export default seed
