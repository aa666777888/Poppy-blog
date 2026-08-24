import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('blog_theme')
    return saved === 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('blog_theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
     setDark(d => !d) }}>
      {children}
    
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
