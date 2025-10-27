// app/components/CountdownTimer.tsx

"use client";

import { useState, useEffect } from 'react';

// Configuração de horários em BRT (Brasília)
const SCHEDULE = {
  closing: {
    day: 5, // Sexta-feira (0 = Domingo, 5 = Sexta)
    hour: 17, // 17:30 BRT
    minute: 30
  },
  opening: {
    day: 6, // Sábado (6 = Sábado)
    hour: 21, // 21:00 BRT
    minute: 0
  }
} as const;

// Função para calcular o próximo evento
const getNextEvent = () => {
  const now = new Date();
  
  // Converte para BRT (UTC-3)
  const nowBRT = new Date(now.getTime() - (3 * 60 * 60 * 1000));
  const currentDay = nowBRT.getUTCDay();
  const currentHour = nowBRT.getUTCHours();
  const currentMinute = nowBRT.getUTCMinutes();

  let targetDate = new Date(now);
  let eventType: 'closing' | 'opening';

  // Lógica para determinar o próximo evento
  if (currentDay < SCHEDULE.closing.day || 
      (currentDay === SCHEDULE.closing.day && 
       (currentHour < SCHEDULE.closing.hour || 
        (currentHour === SCHEDULE.closing.hour && currentMinute < SCHEDULE.closing.minute)))) {
    
    // Próximo evento: FECHAMENTO (Sexta 17:30)
    eventType = 'closing';
    const daysUntilFriday = (SCHEDULE.closing.day - currentDay + 7) % 7;
    targetDate.setUTCDate(nowBRT.getUTCDate() + daysUntilFriday);
    targetDate.setUTCHours(SCHEDULE.closing.hour + 3, SCHEDULE.closing.minute, 0, 0); // +3 para converter BRT→UTC
    
  } else if (currentDay < SCHEDULE.opening.day || 
             (currentDay === SCHEDULE.opening.day && 
              (currentHour < SCHEDULE.opening.hour || 
               (currentHour === SCHEDULE.opening.hour && currentMinute < SCHEDULE.opening.minute)))) {
    
    // Próximo evento: ABERTURA (Sábado 21:00)
    eventType = 'opening';
    const daysUntilSaturday = (SCHEDULE.opening.day - currentDay + 7) % 7;
    targetDate.setUTCDate(nowBRT.getUTCDate() + daysUntilSaturday);
    targetDate.setUTCHours(SCHEDULE.opening.hour + 3, SCHEDULE.opening.minute, 0, 0); // +3 para converter BRT→UTC
    
  } else {
    // Já passou da abertura de sábado, próximo é fechamento da PRÓXIMA sexta
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
        // Se o tempo acabou, recalcula o próximo evento
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  // Textos em português
  const getEventText = () => {
    if (eventType === 'closing') {
      return {
        title: '⏰ Fechamento das Apostas',
        description: 'Sexta-feira às 17:30 (BRT)'
      };
    } else {
      return {
        title: '🎯 Reabertura das Apostas', 
        description: 'Sábado às 21:00 (BRT)'
      };
    }
  };

  const eventText = getEventText();

  return (
    <div className="text-center bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-cyan-500/30 shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">{eventText.title}</h3>
      <p className="text-sm text-slate-300 mb-4">{eventText.description}</p>
      
      <div className="grid grid-cols-4 gap-3 text-white">
        <div className="bg-slate-700/50 p-3 rounded-lg">
          <span className="text-3xl font-bold block">{timeLeft.days.toString().padStart(2, '0')}</span>
          <p className="text-xs text-slate-300 mt-1">Dias</p>
        </div>
        <div className="bg-slate-700/50 p-3 rounded-lg">
          <span className="text-3xl font-bold block">{timeLeft.hours.toString().padStart(2, '0')}</span>
          <p className="text-xs text-slate-300 mt-1">Horas</p>
        </div>
        <div className="bg-slate-700/50 p-3 rounded-lg">
          <span className="text-3xl font-bold block">{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <p className="text-xs text-slate-300 mt-1">Minutos</p>
        </div>
        <div className="bg-slate-700/50 p-3 rounded-lg">
          <span className="text-3xl font-bold block">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          <p className="text-xs text-slate-300 mt-1">Segundos</p>
        </div>
      </div>

      {/* Status atual */}
      <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
        <p className="text-sm text-slate-300">
          {eventType === 'closing' 
            ? '⚡ Apostas ABERTAS - Corra para participar!' 
            : '⏳ Apostas FECHADAS - Aguarde a reabertura'}
        </p>
      </div>
    </div>
  );
}