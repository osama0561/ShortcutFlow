import { createServerClient } from './supabase'
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  email: string
  name: string | null
  role: string
  image: string | null
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  const supabase = createServerClient()

  // Find user by email
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) {
    return { user: null, error: 'Invalid email or password' }
  }

  // Check password
  const isValid = await bcrypt.compare(password, user.password || '')
  if (!isValid) {
    return { user: null, error: 'Invalid email or password' }
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    },
    error: null
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<{ user: User | null; error: string | null }> {
  const supabase = createServerClient()

  // Check if user already exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (existing) {
    return { user: null, error: 'User already exists' }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create user
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      email,
      password: hashedPassword,
      name,
      role: 'ACCOUNT_MANAGER'
    })
    .select()
    .single()

  if (error) {
    return { user: null, error: error.message }
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    },
    error: null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const supabase = createServerClient()

  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, name, role, image')
    .eq('id', id)
    .single()

  if (error || !user) {
    return null
  }

  return user
}
