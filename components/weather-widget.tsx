'use client';

import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
  };
}

const getWeatherIcon = (code: number): string => {
  // WMO Weather interpretation codes
  if (code === 0) return '☀️'; // Clear sky
  if (code === 1 || code === 2 || code === 3) return '🌤️'; // Partly cloudy
  if (code >= 45 && code <= 48) return '🌫️'; // Foggy
  if (code >= 51 && code <= 57) return '🌧️'; // Drizzle
  if (code >= 61 && code <= 67) return '🌧️'; // Rain
  if (code >= 71 && code <= 77) return '🌨️'; // Snow
  if (code >= 80 && code <= 82) return '🌦️'; // Rain showers
  if (code >= 85 && code <= 86) return '🌨️'; // Snow showers
  if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
  return '🌡️';
};

const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Partly cloudy';
  if (code === 2) return 'Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 85 && code <= 86) return 'Snow showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Unknown';
};

export function WeatherWidget() {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState<{ lat: number | null; lon: number | null }>({ lat: null, lon: null });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to a location if geolocation fails
          setPosition({ lat: 51.5074, lon: -0.1278 }); // Default: London
        }
      );
    }
  }, []);

  const { data: weatherData, isLoading, error } = useQuery({
    queryKey: ['weather', position.lat, position.lon],
    queryFn: async () => {
      if (position.lat === null || position.lon === null) return null;
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lon}&current=temperature_2m,relative_humidity_2m,weather_code`
      );
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      return response.json() as Promise<WeatherData>;
    },
    enabled: position.lat !== null && position.lon !== null,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  if (!visible) return null;

  return (
    <Draggable
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      bounds=".env-dashboard-container"
    >
      <div className="absolute bottom-4 right-4 z-50">
        <Card className="w-[220px] bg-black/80 text-white shadow-lg">
          <div className="handle cursor-move p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Weather</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {isLoading && (
              <div className="mt-2 text-sm">Fetching weather...</div>
            )}
            
            {error && (
              <div className="mt-2 text-sm text-red-300">
                Unable to fetch weather data
              </div>
            )}
            
            {weatherData && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {getWeatherIcon(weatherData.current.weather_code)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {Math.round(weatherData.current.temperature_2m)}°C
                    </span>
                    <span className="text-xs text-white/80">
                      {getWeatherDescription(weatherData.current.weather_code)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-white/80">
                  Humidity: {weatherData.current.relative_humidity_2m}%
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Draggable>
  );
}