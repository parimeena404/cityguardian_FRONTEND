'use client';

import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, CloudRain, Sun, Cloud, CloudFog, CloudSnow, CloudLightning } from 'lucide-react';

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="h-6 w-6 text-yellow-400" />;
  if (code >= 1 && code <= 3) return <Cloud className="h-6 w-6 text-gray-400" />;
  if (code >= 45 && code <= 48) return <CloudFog className="h-6 w-6 text-gray-400" />;
  if (code >= 51 && code <= 67) return <CloudRain className="h-6 w-6 text-blue-400" />;
  if (code >= 71 && code <= 77) return <CloudSnow className="h-6 w-6 text-blue-200" />;
  if (code >= 80 && code <= 82) return <CloudRain className="h-6 w-6 text-blue-500" />;
  if (code >= 85 && code <= 86) return <CloudSnow className="h-6 w-6 text-blue-300" />;
  if (code >= 95 && code <= 99) return <CloudLightning className="h-6 w-6 text-yellow-500" />;
  return <Sun className="h-6 w-6 text-yellow-400" />;
};

const getWeatherDescription = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Partly cloudy';
  if (code === 2) return 'Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 57) return 'Light rain';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 85 && code <= 86) return 'Snow showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Unknown';
};

export function SimpleWeatherWidget() {
  const [visible, setVisible] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
      );
      if (!response.ok) throw new Error('Weather data fetch failed');
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherData(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error('Location error:', err);
          // Default to London coordinates if geolocation fails
          fetchWeatherData(51.5074, -0.1278);
        }
      );
    }
  }, []);

  // Refresh weather data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => fetchWeatherData(pos.coords.latitude, pos.coords.longitude),
          () => fetchWeatherData(51.5074, -0.1278)
        );
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      handle=".handle"
      grid={[10, 10]}
      bounds="parent"
    >
      <div className="absolute bottom-4 right-4 z-50">
        <Card className="w-[260px] bg-black/80 backdrop-blur-sm text-white shadow-lg border border-green-500/20 hover:border-green-500/40 transition-colors">
          <div className="handle cursor-move p-4 select-none">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Weather Monitor
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {loading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500" />
              </div>
            )}
            
            {error && (
              <div className="mt-2 text-sm text-red-300 bg-red-950/30 p-2 rounded">
                {error}
              </div>
            )}
            
            {weatherData && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(weatherData.current.weather_code)}
                    <div>
                      <div className="text-2xl font-bold tracking-tight">
                        {Math.round(weatherData.current.temperature_2m)}°C
                      </div>
                      <div className="text-xs text-gray-400">
                        {getWeatherDescription(weatherData.current.weather_code)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <div className="text-xs text-gray-400">
                    Humidity
                    <div className="text-sm text-white">
                      {weatherData.current.relative_humidity_2m}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Wind Speed
                    <div className="text-sm text-white">
                      {Math.round(weatherData.current.wind_speed_10m)} km/h
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Draggable>
  );
}