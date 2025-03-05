import { Box, Input, VStack, useColorModeValue } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { weatherApi } from '../../services/weatherApi'

interface WeatherSearchProps {
  onCitySelect: (lat: number, lon: number, locationName: string) => void
}

export const WeatherSearch = ({ onCitySelect }: WeatherSearchProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const borderColor = useColorModeValue(
    '1px solid rgba(79, 70, 229, 0.3)',
    '1px solid rgba(0, 243, 255, 0.5)'
  )
  const shadowColor = useColorModeValue(
    '0 0 20px rgba(79, 70, 229, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
    '0 0 20px rgba(0, 243, 255, 0.4), 0 0 40px rgba(0, 243, 255, 0.3)'
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchCities = async () => {
      if (query.length >= 2) {
        try {
          const cities = await weatherApi.searchCities(query)
          setResults(cities)
          setIsOpen(true)
        } catch (error) {
          console.error('Error searching cities:', error)
        }
      } else {
        setResults([])
        setIsOpen(false)
      }
    }

    const timeoutId = setTimeout(searchCities, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleCitySelect = (city: any) => {
    const locationName = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`
    onCitySelect(city.lat, city.lon, locationName)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <Box position="relative" ref={searchRef} width="100%" maxW="600px" mx="auto">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        size="lg"
        bg={bgColor}
        color={textColor}
        borderRadius="80px"
        border={borderColor}
        boxShadow={shadowColor}
        px={6}
        _hover={{
          borderColor: useColorModeValue('rgba(79, 70, 229, 0.5)', 'rgba(0, 243, 255, 0.7)'),
          boxShadow: useColorModeValue(
            '0 0 30px rgba(79, 70, 229, 0.4), 0 0 60px rgba(79, 70, 229, 0.3)',
            '0 0 30px rgba(0, 243, 255, 0.5), 0 0 60px rgba(0, 243, 255, 0.4)'
          ),
        }}
        _focus={{
          borderColor: useColorModeValue('rgba(79, 70, 229, 0.7)', 'rgba(0, 243, 255, 0.9)'),
          boxShadow: useColorModeValue(
            '0 0 30px rgba(79, 70, 229, 0.4), 0 0 60px rgba(79, 70, 229, 0.3)',
            '0 0 30px rgba(0, 243, 255, 0.5), 0 0 60px rgba(0, 243, 255, 0.4)'
          ),
        }}
        _placeholder={{
          color: useColorModeValue('gray.400', 'gray.500'),
        }}
      />
      {isOpen && results.length > 0 && (
        <VStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          bg={bgColor}
          borderRadius="2xl"
          border={borderColor}
          boxShadow={shadowColor}
          maxH="300px"
          overflowY="auto"
          zIndex={1000}
          spacing={0}
          mx={4}
        >
          {results.map((city, index) => (
            <Box
              key={`${city.name}-${city.country}-${index}`}
              w="100%"
              p={3}
              cursor="pointer"
              _hover={{
                bg: useColorModeValue('rgba(79, 70, 229, 0.1)', 'rgba(0, 243, 255, 0.1)'),
              }}
              onClick={() => handleCitySelect(city)}
              borderBottom={index < results.length - 1 ? borderColor : 'none'}
              transition="all 0.2s"
            >
              <Box
                fontSize="md"
                color={textColor}
                fontWeight="medium"
                textShadow={useColorModeValue(
                  '0 0 10px rgba(79, 70, 229, 0.2)',
                  '0 0 10px rgba(0, 243, 255, 0.2)'
                )}
              >
                {city.name}
                {city.state && `, ${city.state}`}
              </Box>
              <Box
                fontSize="sm"
                color={useColorModeValue('gray.500', 'gray.400')}
                textShadow={useColorModeValue(
                  '0 0 10px rgba(79, 70, 229, 0.1)',
                  '0 0 10px rgba(0, 243, 255, 0.1)'
                )}
              >
                {city.country}
              </Box>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
} 