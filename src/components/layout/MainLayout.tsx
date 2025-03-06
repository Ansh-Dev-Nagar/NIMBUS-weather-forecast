import { Box, Container, Flex, IconButton, useColorMode, useColorModeValue, useToast } from '@chakra-ui/react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { WeatherSearch } from '../weather/WeatherSearch'
import { CurrentWeather } from '../weather/CurrentWeather'
import { WeatherForecast } from '../weather/WeatherForecast'
import { useState, useEffect } from 'react'
import { weatherApi, WeatherData, ForecastData } from '../../services/weatherApi'

export const MainLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const bgGradient = useColorModeValue(
    'linear(to-br, #ffffff, #f0f9ff)',
    'linear(to-br, #0a0a0a, #1a1a1a)'
  )

  useEffect(() => {
    const loadDefaultWeather = async () => {
      setIsLoading(true)
      try {
        const { weatherData, forecastData } = await weatherApi.getDefaultWeather()
        setCurrentWeather(weatherData)
        setForecast(forecastData)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load weather data. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadDefaultWeather()
  }, [toast])

  const handleCitySelect = async (lat: number, lon: number, locationName: string) => {
    setIsLoading(true)
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeather(lat, lon, locationName),
        weatherApi.getForecast(lat, lon)
      ])
      
      setCurrentWeather(weatherData)
      setForecast(forecastData)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch weather data. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg={bgGradient}
      bgAttachment="fixed"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: useColorModeValue(
          'radial-gradient(circle at 50% 0%, rgba(79, 70, 229, 0.1), transparent 70%)',
          'radial-gradient(circle at 50% 0%, rgba(0, 243, 255, 0.1), transparent 70%)'
        ),
        zIndex: 0,
      }}
    >
      <Container maxW="container.xl" py={8} position="relative" zIndex={1}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Box
              as="h1"
              fontSize="3xl"
              fontWeight="bold"
              bgGradient={useColorModeValue(
                'linear(to-r, light.gradient.start, light.gradient.end)',
                'linear(to-r, dark.gradient.start, dark.gradient.end)'
              )}
              bgClip="text"
              textShadow={useColorModeValue(
                '0 0 10px rgba(79, 70, 229, 0.3)',
                '0 0 10px rgba(0, 243, 255, 0.3)'
              )}
            >
              Nimbus Forecast
            </Box>
          </Box>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
            size="lg"
            borderRadius="full"
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: useColorModeValue(
                '0 0 20px rgba(79, 70, 229, 0.3)',
                '0 0 20px rgba(0, 243, 255, 0.3)'
              ),
            }}
            transition="all 0.3s"
          />
        </Flex>

        <Box mb={8}>
          <WeatherSearch onCitySelect={handleCitySelect} isLoading={isLoading} />
        </Box>

        {currentWeather && (
          <Box mb={8}>
            <CurrentWeather weather={currentWeather} isLoading={isLoading} />
          </Box>
        )}

        {forecast.length > 0 && (
          <Box>
            <WeatherForecast forecast={forecast} isLoading={isLoading} />
          </Box>
        )}
      </Container>
    </Box>
  )
} 