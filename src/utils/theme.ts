import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6f6ff',
      100: '#bae3ff',
      200: '#7cc4fa',
      300: '#47a3f3',
      400: '#2186eb',
      500: '#0967d2',
      600: '#0552b5',
      700: '#03449e',
      800: '#01337d',
      900: '#002159',
    },
    neon: {
      blue: '#00f3ff',
      purple: '#9d00ff',
      pink: '#ff00ff',
      green: '#00ff9d',
    },
    light: {
      bg: '#ffffff',
      card: 'rgba(255, 255, 255, 0.85)',
      cardGradient: 'linear(to-br, rgba(255, 255, 255, 0.95), rgba(240, 249, 255, 0.95))',
      border: '#e9ecef',
      accent: '#4f46e5',
      gradient: {
        start: '#4f46e5',
        end: '#3b82f6',
      },
      glow: '#4f46e5',
      bgGradient: {
        primary: 'linear(135deg, #ff6b6b, #4ecdc4)',
        secondary: 'linear(135deg, #a8e6cf, #dcedc1)',
      },
      cardShadow: '0 4px 6px rgba(79, 70, 229, 0.2), 0 0 20px rgba(79, 70, 229, 0.2)',
      cardHoverShadow: '0 6px 8px rgba(79, 70, 229, 0.3), 0 0 30px rgba(79, 70, 229, 0.3)',
      searchBar: {
        bg: 'rgba(255, 255, 255, 0.9)',
        border: 'rgba(79, 70, 229, 0.2)',
        shadow: '0 4px 6px rgba(79, 70, 229, 0.1), 0 0 20px rgba(79, 70, 229, 0.1)',
        hoverShadow: '0 6px 8px rgba(79, 70, 229, 0.2), 0 0 30px rgba(79, 70, 229, 0.2)',
      }
    },
    dark: {
      bg: '#0a0a0a',
      card: 'rgba(26, 26, 26, 0.85)',
      cardGradient: 'linear(to-br, rgba(26, 26, 26, 0.95), rgba(42, 42, 42, 0.95))',
      border: '#2a2a2a',
      accent: '#00f3ff',
      gradient: {
        start: '#00f3ff',
        end: '#9d00ff',
      },
      glow: '#00f3ff',
      bgGradient: {
        primary: 'linear(135deg, #1a1a1a, #2a2a2a)',
        secondary: 'linear(135deg, #2a2a2a, #3a3a3a)',
      },
      cardShadow: '0 4px 6px rgba(0, 243, 255, 0.2), 0 0 20px rgba(0, 243, 255, 0.2)',
      cardHoverShadow: '0 6px 8px rgba(0, 243, 255, 0.3), 0 0 30px rgba(0, 243, 255, 0.3)',
      searchBar: {
        bg: 'rgba(26, 26, 26, 0.9)',
        border: 'rgba(0, 243, 255, 0.2)',
        shadow: '0 4px 6px rgba(0, 243, 255, 0.1), 0 0 20px rgba(0, 243, 255, 0.1)',
        hoverShadow: '0 6px 8px rgba(0, 243, 255, 0.2), 0 0 30px rgba(0, 243, 255, 0.2)',
      },
      mainCard: {
        border: '2px solid rgba(0, 243, 255, 0.8)',
        boxShadow: '0 0 30px rgba(0, 243, 255, 0.5), inset 0 0 30px rgba(0, 243, 255, 0.3)',
        hover: {
          border: '2px solid rgba(0, 243, 255, 1)',
          boxShadow: '0 0 40px rgba(0, 243, 255, 0.7), inset 0 0 40px rgba(0, 243, 255, 0.5)',
        }
      }
    }
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0f172a' : 'light.bg',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
        backgroundImage: props.colorMode === 'dark' 
          ? `
            linear(135deg, #0f172a, #1e293b),
            radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)
          `
          : `
            linear(135deg, #ff6b6b, #4ecdc4),
            radial-gradient(circle at 50% 0%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(78, 205, 196, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(255, 107, 107, 0.15) 0%, transparent 50%)
          `,
        backgroundAttachment: 'fixed',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme; 