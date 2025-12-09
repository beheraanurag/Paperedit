export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface Service {
  id: string
  name: string
  description: string
  category: string
  price: number
  createdAt: string
}

export interface ServiceRequest {
  id: string
  userId: string
  serviceId: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  details: string
  files: string[]
  createdAt: string
  updatedAt: string
  service?: Service
  user?: User
}

export interface Blog {
  id: string
  title: string
  content: string
  author: string
  category: string
  createdAt: string
  updatedAt: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  createdAt: string
}

export interface File {
  id: string
  requestId: string
  filename: string
  path: string
  type: string
  uploadedAt: string
}
