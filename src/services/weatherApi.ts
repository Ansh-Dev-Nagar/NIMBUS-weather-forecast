import axios from 'axios';

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_URL = 'https://api.open-meteo.com/v1';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  location: string;
  icon: string;
}

export interface ForecastData {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
}

// Map OpenMeteo weather codes to conditions and icons
const weatherCodeMap: { [key: number]: { condition: string; icon: string } } = {
  0: { condition: 'Clear', icon: '01d' },
  1: { condition: 'Clear', icon: '01d' },
  2: { condition: 'Partly Cloudy', icon: '02d' },
  3: { condition: 'Cloudy', icon: '03d' },
  45: { condition: 'Foggy', icon: '50d' },
  48: { condition: 'Foggy', icon: '50d' },
  51: { condition: 'Drizzle', icon: '09d' },
  53: { condition: 'Drizzle', icon: '09d' },
  55: { condition: 'Drizzle', icon: '09d' },
  61: { condition: 'Rain', icon: '10d' },
  63: { condition: 'Rain', icon: '10d' },
  65: { condition: 'Rain', icon: '10d' },
  71: { condition: 'Snow', icon: '13d' },
  73: { condition: 'Snow', icon: '13d' },
  75: { condition: 'Snow', icon: '13d' },
  77: { condition: 'Snow', icon: '13d' },
  80: { condition: 'Rain', icon: '10d' },
  81: { condition: 'Rain', icon: '10d' },
  82: { condition: 'Rain', icon: '10d' },
  85: { condition: 'Snow', icon: '13d' },
  86: { condition: 'Snow', icon: '13d' },
  95: { condition: 'Thunderstorm', icon: '11d' },
  96: { condition: 'Thunderstorm', icon: '11d' },
  99: { condition: 'Thunderstorm', icon: '11d' },
};

export const weatherApi = {
  async searchCities(query: string) {
    try {
      const response = await axios.get(
        `${BASE_URL}/search?name=${query}&count=5&language=en&format=json`
      );
      
      if (!response.data.results) {
        return [];
      }

      return response.data.results.map((city: any) => ({
        name: city.name,
        country: city.country,
        state: city.admin1,
        lat: city.latitude,
        lon: city.longitude
      }));
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  },

  async getCurrentWeather(lat: number, lon: number, locationName?: string) {
    try {
      const response = await axios.get(
        `${WEATHER_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
      );
      
      const current = response.data.current;
      const weatherCode = current.weather_code;
      const weatherInfo = weatherCodeMap[weatherCode] || { condition: 'Unknown', icon: '01d' };

      return {
        temperature: Math.round(current.temperature_2m),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        condition: weatherInfo.condition,
        location: locationName || 'Unknown Location',
        icon: weatherInfo.icon
      } as WeatherData;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  async getForecast(lat: number, lon: number) {
    try {
      const response = await axios.get(
        `${WEATHER_URL}/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
      );
      
      const daily = response.data.daily;
      const forecasts: ForecastData[] = [];

      for (let i = 0; i < 7; i++) {
        const weatherCode = daily.weather_code[i];
        const weatherInfo = weatherCodeMap[weatherCode] || { condition: 'Unknown', icon: '01d' };

        forecasts.push({
          date: new Date(daily.time[i]).toLocaleDateString('en-US', { weekday: 'short' }),
          maxTemp: Math.round(daily.temperature_2m_max[i]),
          minTemp: Math.round(daily.temperature_2m_min[i]),
          condition: weatherInfo.condition,
          icon: weatherInfo.icon
        });
      }

      return forecasts;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  // Get default location weather
  async getDefaultWeather() {
    const defaultLocation = {
      name: 'New Delhi',
      country: 'India',
      lat: 28.6139,
      lon: 77.2090
    };
    
    const [weatherData, forecastData] = await Promise.all([
      this.getCurrentWeather(defaultLocation.lat, defaultLocation.lon, defaultLocation.name),
      this.getForecast(defaultLocation.lat, defaultLocation.lon)
    ]);
    
    return { weatherData, forecastData };
  }
}; 