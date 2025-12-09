import 'tsconfig-paths/register'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import express from 'express'
import cors from 'cors'
import type { Request, Response } from 'express'
import type { VercelRequest, VercelResponse } from '@vercel/node'

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env file
config({ path: resolve(__dirname, '.env') })

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET environment variable is not set!')
  console.error('   Please create a .env file in the project root with:')
  console.error('   JWT_SECRET=your-secret-key-here')
  console.error('')
  console.error('   You can generate a secure secret with:')
  console.error('   node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"')
  process.exit(1)
}

// Import API handlers
import loginHandler from './app/api/auth/login.js'
import registerHandler from './app/api/auth/register.js'
import profileHandler from './app/api/auth/profile.js'
import servicesHandler from './app/api/services/index.js'
import blogsHandler from './app/api/blogs/index.js'
import faqHandler from './app/api/faq/index.js'

// Dynamic import for file with brackets in name
let blogDetailHandler: any
async function loadBlogDetailHandler() {
  try {
    // Use a path that works with the file system
    const module = await import('./app/api/blogs/[id].js')
    blogDetailHandler = module.default
  } catch (error) {
    console.error('Failed to load blog detail handler:', error)
    // Fallback: create a simple handler
    blogDetailHandler = async (req: VercelRequest, res: VercelResponse) => {
      res.status(500).json({ error: 'Blog detail handler not available' })
    }
  }
}

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Convert Express Request/Response to Vercel Request/Response
function createVercelRequest(req: Request): VercelRequest {
  return {
    ...req,
    query: req.query as Record<string, string | string[]>,
    body: req.body,
    method: req.method,
    url: req.url,
    headers: req.headers as Record<string, string | string[] | undefined>,
  } as unknown as VercelRequest
}

function createVercelResponse(res: Response): VercelResponse {
  const vercelRes = {
    status: (code: number) => {
      res.status(code)
      return vercelRes
    },
    json: (data: any) => {
      res.json(data)
      return vercelRes
    },
    send: (data: any) => {
      res.send(data)
      return vercelRes
    },
    end: () => {
      res.end()
      return vercelRes
    },
    setHeader: (name: string, value: string) => {
      res.setHeader(name, value)
      return vercelRes
    },
  } as unknown as VercelResponse

  return vercelRes
}

// API Routes
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const vercelReq = createVercelRequest(req)
  const vercelRes = createVercelResponse(res)
  await loginHandler(vercelReq, vercelRes)
})

app.post('/api/auth/register', async (req: Request, res: Response) => {
  const vercelReq = createVercelRequest(req)
  const vercelRes = createVercelResponse(res)
  await registerHandler(vercelReq, vercelRes)
})

app.get('/api/auth/profile', async (req: Request, res: Response) => {
  const vercelReq = createVercelRequest(req)
  const vercelRes = createVercelResponse(res)
  await profileHandler(vercelReq, vercelRes)
})

app.get('/api/services', async (req: Request, res: Response) => {
  const vercelReq = createVercelRequest(req)
  const vercelRes = createVercelResponse(res)
  await servicesHandler(vercelReq, vercelRes)
})

app.get('/api/blogs', async (req: Request, res: Response) => {
  const vercelReq = createVercelRequest(req)
  const vercelRes = createVercelResponse(res)
  await blogsHandler(vercelReq, vercelRes)
})

app.get('/api/blogs/:id', async (req: Request, res: Response) => {
  if (!blogDetailHandler) {
    await loadBlogDetailHandler()
  }
  const vercelReq = createVercelRequest(req)
  vercelReq.query = { id: req.params.id }
  const vercelRes = createVercelResponse(res)
  await blogDetailHandler(vercelReq, vercelRes)
})

app.get('/api/faq', async (req: Request, res: Response) => {
  const vercelReq = createVercelRequest(req)
  const vercelRes = createVercelResponse(res)
  await faqHandler(vercelReq, vercelRes)
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Initialize and start server
async function startServer() {
  try {
    // Pre-load the dynamic route handler
    console.log('Loading API handlers...')
    await loadBlogDetailHandler()
    console.log('✅ All handlers loaded successfully')
  } catch (error) {
    console.warn('⚠️  Some handlers failed to load, but server will continue:', error)
  }

  app.listen(PORT, () => {
    console.log(`🚀 API server running on http://localhost:${PORT}`)
    console.log(`📡 API routes available at http://localhost:${PORT}/api/*`)
  })
}

startServer().catch((error) => {
  console.error('❌ Failed to start server:', error)
  process.exit(1)
})
