import { Box, Text, HStack, useColorModeValue } from '@chakra-ui/react'
import { WeatherData } from '../../services/weatherApi'
import { FiDroplet, FiWind, FiThermometer, FiSun } from 'react-icons/fi'

interface CurrentWeatherProps {
  weather: WeatherData
}

export const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const headingColor = useColorModeValue('gray.800', 'white')
  
  const neonBorder = useColorModeValue(
    '2px solid rgba(79, 70, 229, 0.3)',
    '2px solid rgba(0, 243, 255, 0.5)'
  )
  
  const neonShadow = useColorModeValue(
    '0 0 20px rgba(79, 70, 229, 0.3), 0 0 40px rgba(79, 70, 229, 0.2)',
    '0 0 20px rgba(0, 243, 255, 0.4), 0 0 40px rgba(0, 243, 255, 0.3)'
  )
  
  const neonHover = useColorModeValue(
    '0 0 30px rgba(79, 70, 229, 0.4), 0 0 60px rgba(79, 70, 229, 0.3)',
    '0 0 30px rgba(0, 243, 255, 0.5), 0 0 60px rgba(0, 243, 255, 0.4)'
  )

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="80px"
      border={neonBorder}
      boxShadow={neonShadow}
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: useColorModeValue(
          'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(59, 130, 246, 0.1))',
          'linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(157, 0, 255, 0.1))'
        ),
        zIndex: 0,
      }}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: neonHover,
      }}
    >
      <Box position="relative" zIndex={1} px={8}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={headingColor}
          mb={2}
          textShadow={useColorModeValue(
            '0 0 10px rgba(79, 70, 229, 0.4)',
            '0 0 10px rgba(0, 243, 255, 0.4)'
          )}
          letterSpacing="wider"
        >
          {weather.location}
        </Text>
        <HStack spacing={8} align="center" justify="space-between">
          <Box flex="1">
            <Text
              fontSize="5xl"
              fontWeight="bold"
              color={headingColor}
              mb={2}
              textShadow={useColorModeValue(
                '0 0 15px rgba(79, 70, 229, 0.5)',
                '0 0 15px rgba(0, 243, 255, 0.5)'
              )}
              letterSpacing="wider"
            >
              {weather.temperature}°C
            </Text>
            <Text
              fontSize="lg"
              color={textColor}
              mb={4}
              textShadow={useColorModeValue(
                '0 0 10px rgba(79, 70, 229, 0.3)',
                '0 0 10px rgba(0, 243, 255, 0.3)'
              )}
              letterSpacing="wide"
            >
              {weather.condition}
            </Text>
            <HStack spacing={3} flexWrap="wrap">
              <HStack
                p={2}
                borderRadius="lg"
                bg={useColorModeValue('rgba(79, 70, 229, 0.1)', 'rgba(0, 243, 255, 0.1)')}
                backdropFilter="blur(10px)"
                boxShadow={useColorModeValue(
                  '0 0 15px rgba(79, 70, 229, 0.2)',
                  '0 0 15px rgba(0, 243, 255, 0.2)'
                )}
              >
                <FiThermometer color={textColor} size={18} />
                <Text color={textColor} fontSize="sm">Feels like {weather.temperature}°C</Text>
              </HStack>
              <HStack
                p={2}
                borderRadius="lg"
                bg={useColorModeValue('rgba(79, 70, 229, 0.1)', 'rgba(0, 243, 255, 0.1)')}
                backdropFilter="blur(10px)"
                boxShadow={useColorModeValue(
                  '0 0 15px rgba(79, 70, 229, 0.2)',
                  '0 0 15px rgba(0, 243, 255, 0.2)'
                )}
              >
                <FiDroplet color={textColor} size={18} />
                <Text color={textColor} fontSize="sm">{weather.humidity}% Humidity</Text>
              </HStack>
              <HStack
                p={2}
                borderRadius="lg"
                bg={useColorModeValue('rgba(79, 70, 229, 0.1)', 'rgba(0, 243, 255, 0.1)')}
                backdropFilter="blur(10px)"
                boxShadow={useColorModeValue(
                  '0 0 15px rgba(79, 70, 229, 0.2)',
                  '0 0 15px rgba(0, 243, 255, 0.2)'
                )}
              >
                <FiWind color={textColor} size={18} />
                <Text color={textColor} fontSize="sm">{weather.windSpeed} km/h Wind</Text>
              </HStack>
              <HStack
                p={2}
                borderRadius="lg"
                bg={useColorModeValue('rgba(79, 70, 229, 0.1)', 'rgba(0, 243, 255, 0.1)')}
                backdropFilter="blur(10px)"
                boxShadow={useColorModeValue(
                  '0 0 15px rgba(79, 70, 229, 0.2)',
                  '0 0 15px rgba(0, 243, 255, 0.2)'
                )}
              >
                <FiSun color={textColor} size={18} />
                <Text color={textColor} fontSize="sm">UV Index: Moderate</Text>
              </HStack>
            </HStack>
          </Box>
          <Box 
            display="flex" 
            justifyContent="center"
            position="relative"
          >
            <Box
              position="relative"
              width="120px"
              height="120px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _before={{
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: useColorModeValue(
                  'radial-gradient(circle, rgba(79, 70, 229, 0.2), transparent 70%)',
                  'radial-gradient(circle, rgba(0, 243, 255, 0.2), transparent 70%)'
                ),
                borderRadius: '50%',
                zIndex: 0,
                animation: 'pulse 2s infinite',
              }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt={weather.condition}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  filter: useColorModeValue('brightness(0.7) contrast(1.4)', 'brightness(1.3) contrast(1.2)'),
                  position: 'relative',
                  zIndex: 1,
                  transform: 'scale(1.1)',
                  animation: 'float 3s ease-in-out infinite',
                }}
              />
            </Box>
          </Box>
        </HStack>
      </Box>
    </Box>
  )
} 