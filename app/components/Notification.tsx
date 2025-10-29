'use client';

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Notification({ 
  type, 
  message, 
  onClose, 
  duration = 5000 
}: NotificationProps) {
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };

  const styles = {
    success: 'bg-green-500/20 border-green-500 text-green-300',
    error: 'bg-red-500/20 border-red-500 text-red-300',
    info: 'bg-blue-500/20 border-blue-500 text-blue-300',
    warning: 'bg-yellow-500/20 border-yellow-500 text-yellow-300'
  };

  return (
    <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 ${styles[type]}`}>
      <div className="flex items-center gap-3">
        <span className="text-lg">{icons[type]}</span>
        <span className="font-semibold">{message}</span>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}