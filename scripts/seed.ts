import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import seed from '../app/lib/db/seed.js'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '..')

config({ path: resolve(rootDir, '.env') })

// Run seed
seed()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Seed script failed:', error)
    process.exit(1)
  })
