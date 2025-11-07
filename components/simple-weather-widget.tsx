'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function SimpleWeatherWidget() {
  const [visible, setVisible] = useState(true);
  const [weather, setWeather] = useState<{ temp: number; description: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          description: "Current Weather"
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    // Default to London coordinates for testing
    getWeather(51.5074, -0.1278);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 cursor-move">
      <Card className="w-[220px] bg-black/80 text-white shadow-lg">
        <div className="p-4">
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
          
          {loading ? (
            <div className="mt-2 text-sm">Loading weather...</div>
          ) : weather ? (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌡️</span>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    {weather.temp}°C
                  </span>
                  <span className="text-xs text-white/80">
                    {weather.description}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-sm text-red-300">
              Unable to load weather
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}