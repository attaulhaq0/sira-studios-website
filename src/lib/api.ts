/**
 * API Client for Hostinger Backend
 * Connects to PHP backend hosted on Hostinger
 */

// Configure an explicitly selected backend for local or deployed use.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Token management
const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Generic fetch wrapper with auth
const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
};

// Auth types
export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

// Auth functions
export const auth = {
  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    const response = await apiFetch('/auth.php?action=register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await apiFetch('/auth.php?action=login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },

  async signOut(): Promise<void> {
    removeToken();
  },

  async getUser(): Promise<User | null> {
    const token = getToken();
    if (!token) return null;

    try {
      const response = await apiFetch('/auth.php?action=me');
      return response.user || null;
    } catch {
      removeToken();
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!getToken();
  },

  getToken,
  setToken,
  removeToken,
};

// Contact form
export const contact = {
  async submit(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): Promise<{ success: boolean; id: string }> {
    return apiFetch('/contact.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Career applications
export const careers = {
  async submit(data: {
    name: string;
    email: string;
    phone?: string;
    position: string;
    portfolio_url?: string;
    message: string;
  }): Promise<{ success: boolean; id: string }> {
    return apiFetch('/careers.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Admin functions
export const admin = {
  async getContacts(): Promise<{ data: any[] }> {
    return apiFetch('/admin.php?action=contacts');
  },

  async getCareers(): Promise<{ data: any[] }> {
    return apiFetch('/admin.php?action=careers');
  },

  async getUserRoles(): Promise<{ roles: string[] }> {
    return apiFetch('/admin.php?action=roles');
  },

  async checkAdmin(): Promise<{ isAdmin: boolean }> {
    return apiFetch('/admin.php?action=check-admin');
  },
};

// Default export for convenience
const api = {
  auth,
  contact,
  careers,
  admin,
};

export default api;
