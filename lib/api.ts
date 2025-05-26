"use client";

/**
 * API service for interacting with the snippet backend
 */

export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  installCommand: string;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface CreateSnippetPayload {
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  installCommand: string;
}
/**
 * Get mock snippets for fallback
 */
export function getMockSnippets(): Snippet[] {
  return [
    {
      id: "1",
      title: "useLocalStorage Hook",
      description: "React hook for managing localStorage values",
      language: "typescript",
      category: "hooks",
      code: `import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error)
      return initialValue
    }
  }

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error)
    }
  }

  useEffect(() => {
    setStoredValue(readValue())
  }, [])

  return [storedValue, setValue]
}`,
      installCommand: "npx create-file hooks/useLocalStorage.ts",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    },
    {
      id: "2",
      title: "API Service",
      description: "Base API service with Axios",
      language: "typescript",
      category: "services",
      code: `import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = \`Bearer \${token}\`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config);
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }
}

export default new ApiService(process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com');`,
      installCommand: "npx create-file services/apiService.ts",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: true,
    },
    {
      id: "3",
      title: "Format Date Utility",
      description: "Format dates in different styles",
      language: "typescript",
      category: "utils",
      code: `export const formatDate = (date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }
  
  if (format === 'short') {
    return d.toLocaleDateString();
  }
  
  if (format === 'long') {
    return d.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  if (format === 'relative') {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return \`\${diffInSeconds} seconds ago\`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return \`\${diffInMinutes} minute\${diffInMinutes === 1 ? '' : 's'} ago\`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return \`\${diffInHours} hour\${diffInHours === 1 ? '' : 's'} ago\`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return \`\${diffInDays} day\${diffInDays === 1 ? '' : 's'} ago\`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return \`\${diffInMonths} month\${diffInMonths === 1 ? '' : 's'} ago\`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return \`\${diffInYears} year\${diffInYears === 1 ? '' : 's'} ago\`;
  }
  
  return d.toLocaleDateString();
};`,
      installCommand: "npx create-file utils/formatDate.ts",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    },
    {
      id: "4",
      title: "Tailwind Button Component",
      description: "Reusable button with variants",
      language: "typescript",
      category: "components",
      code: `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'div' : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };`,
      installCommand: "npx create-file components/ui/button.tsx",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: true,
    },
  ];
}
