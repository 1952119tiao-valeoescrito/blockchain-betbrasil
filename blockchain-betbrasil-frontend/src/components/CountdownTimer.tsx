"use client";

import { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';

// Configuração de horários em BRT (Brasília)
const SCHEDULE = {
  closing: {
    day: 5, // Sexta-feira
    hour: 17, // 17:30 BRT
    minute: 30
  },
  opening: {
    day: 6, // Sábado
    hour: 21, // 21:00 BRT
    minute: 0
  }
} as const;

const getNextEvent = () => {
  const now = new Date();
  // Ajuste visual para cálculo BRT (UTC-3)
  const nowBRT = new Date(now.getTime() - (3 * 60 * 60 * 1000));
  const currentDay = nowBRT.getUTCDay();
  const currentHour = nowBRT.getUTCHours();
  const currentMinute = nowBRT.getUTCMinutes();

  let targetDate = new Date(now);
  let eventType: 'closing' | 'opening';

  if (currentDay < SCHEDULE.closing.day || 
      (currentDay === SCHEDULE.closing.day && 
       (currentHour < SCHEDULE.closing.hour || 
        (currentHour === SCHEDULE.closing.hour && currentMinute < SCHEDULE.closing.minute)))) {
    
    eventType = 'closing';
    const daysUntilFriday = (SCHEDULE.closing.day - currentDay + 7) % 7;
    targetDate.setUTCDate(nowBRT.getUTCDate() + daysUntilFriday);
    targetDate.setUTCHours(SCHEDULE.closing.hour + 3, SCHEDULE.closing.minute, 0, 0); 
    
  } else if (currentDay < SCHEDULE.opening.day || 
             (currentDay === SCHEDULE.opening.day && 
              (currentHour < SCHEDULE.opening.hour || 
               (currentHour === SCHEDULE.opening.hour && currentMinute < SCHEDULE.opening.minute)))) {
    
    eventType = 'opening';
    const daysUntilSaturday = (SCHEDULE.opening.day - currentDay + 7) % 7;
    targetDate.setUTCDate(nowBRT.getUTCDate() + daysUntilSaturday);
    targetDate.setUTCHours(SCHEDULE.opening.hour + 3, SCHEDULE.opening.minute, 0, 0);
    
  } else {
    eventType = 'closing';
    const daysUntilNextFriday = (SCHEDULE.closing.day - currentDay + 7) % 7;
    targetDate.setUTCDate(nowBRT.getUTCDate() + daysUntilNextFriday + 7);
    targetDate.setUTCHours(SCHEDULE.closing.hour + 3, SCHEDULE.closing.minute, 0, 0);
  }

  return { targetDate, eventType };
};

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [eventType, setEventType] = useState<'closing' | 'opening'>('closing');

  useEffect(() => {
    const updateCountdown = () => {
      const { targetDate, eventType: currentEvent } = getNextEvent();
      setEventType(currentEvent);
      
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const getEventText = () => {
    if (eventType === 'closing') {
      return {
        title: 'FECHAMENTO DA RODADA',
        description: 'Sexta-feira às 17:30 (BRT)',
        icon: <Lock size={14} className="text-[#D4A373]" />
      };
    } else {
      return {
        title: 'ABERTURA DA NOVA RODADA', 
        description: 'Sábado às 21:00 (BRT)',
        icon: <Unlock size={14} className="text-gray-400" />
      };
    }
  };

  const eventText = getEventText();

  return (
    <div className="mt-6 mb-2">
        {/* Header do Timer */}
        <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
                {eventText.icon}
                <span className="text-[#D4A373] text-[10px] font-bold tracking-widest uppercase">{eventText.title}</span>
            </div>
            <span className="text-[10px] text-gray-500 hidden sm:inline">{eventText.description}</span>
        </div>

        {/* Mostrador Digital */}
        <div className="grid grid-cols-4 gap-2">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-center">
                <span className="text-xl md:text-2xl font-mono font-bold text-white block leading-none">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 uppercase">Dias</span>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-center">
                <span className="text-xl md:text-2xl font-mono font-bold text-white block leading-none">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 uppercase">Horas</span>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-center">
                <span className="text-xl md:text-2xl font-mono font-bold text-white block leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 uppercase">Min</span>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#D4A373]/5 animate-pulse"></div>
                <span className="text-xl md:text-2xl font-mono font-bold text-[#D4A373] block leading-none relative z-10">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 uppercase relative z-10">Seg</span>
            </div>
        </div>

        {/* Status da Barra */}
        <div className="mt-3 flex items-center justify-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${eventType === 'closing' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <p className="text-[9px] text-gray-400 uppercase tracking-wide">
            {eventType === 'closing' 
                ? 'APOSTAS ABERTAS' 
                : 'RODADA FECHADA'}
            </p>
        </div>
    </div>
  );
}