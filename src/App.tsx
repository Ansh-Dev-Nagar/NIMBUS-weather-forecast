import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import theme from './utils/theme'
import { MainLayout } from '@/components/layout/MainLayout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <MainLayout />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
