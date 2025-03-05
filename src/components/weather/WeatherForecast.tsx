import { Box, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import { ForecastData } from '../../services/weatherApi'

interface WeatherForecastProps {
  forecast: ForecastData[]
}

export const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const headingColor = useColorModeValue('gray.800', 'white')
  const cardBgColor = useColorModeValue('rgba(79, 70, 229, 0.05)', 'rgba(0, 243, 255, 0.05)')
  const cardBorderColor = useColorModeValue(
    '1px solid rgba(79, 70, 229, 0.2)',
    '1px solid rgba(0, 243, 255, 0.3)'
  )
  const cardShadowColor = useColorModeValue(
    '0 0 15px rgba(79, 70, 229, 0.1)',
    '0 0 15px rgba(0, 243, 255, 0.2)'
  )
  const cardHoverShadowColor = useColorModeValue(
    '0 0 20px rgba(79, 70, 229, 0.2)',
    '0 0 20px rgba(0, 243, 255, 0.3)'
  )
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
      bg={bgColor}
      p={6}
      borderRadius="80px"
      border={neonBorder}
      boxShadow={neonShadow}
      backdropFilter="blur(10px)"
      position="relative"
      overflow="hidden"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
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
          fontSize="xl"
          fontWeight="bold"
          color={headingColor}
          mb={4}
          textShadow={useColorModeValue(
            '0 0 10px rgba(79, 70, 229, 0.3)',
            '0 0 10px rgba(0, 243, 255, 0.3)'
          )}
        >
          7-Day Forecast
        </Text>
        <HStack spacing={4} justify="space-between" pb={2}>
          {forecast.map((day, index) => (
            <Box
              key={index}
              flex="1"
              p={3}
              bg={cardBgColor}
              borderRadius="xl"
              border={cardBorderColor}
              boxShadow={cardShadowColor}
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: cardHoverShadowColor,
              }}
              backdropFilter="blur(10px)"
            >
              <VStack spacing={2} align="center">
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={headingColor}
                  textShadow={useColorModeValue(
                    '0 0 10px rgba(79, 70, 229, 0.2)',
                    '0 0 10px rgba(0, 243, 255, 0.2)'
                  )}
                >
                  {day.date}
                </Text>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.condition}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'contain',
                    filter: useColorModeValue('brightness(0.8) contrast(1.2)', 'brightness(1.2) contrast(1.1)'),
                  }}
                />
                <Text
                  fontSize="xs"
                  color={textColor}
                  textAlign="center"
                  textShadow={useColorModeValue(
                    '0 0 10px rgba(79, 70, 229, 0.1)',
                    '0 0 10px rgba(0, 243, 255, 0.1)'
                  )}
                >
                  {day.condition}
                </Text>
                <VStack spacing={0.5}>
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color={headingColor}
                    textShadow={useColorModeValue(
                      '0 0 10px rgba(79, 70, 229, 0.2)',
                      '0 0 10px rgba(0, 243, 255, 0.2)'
                    )}
                  >
                    {day.maxTemp}°
                  </Text>
                  <Text
                    fontSize="xs"
                    color={textColor}
                    textShadow={useColorModeValue(
                      '0 0 10px rgba(79, 70, 229, 0.1)',
                      '0 0 10px rgba(0, 243, 255, 0.1)'
                    )}
                  >
                    {day.minTemp}°
                  </Text>
                </VStack>
              </VStack>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  )
} 