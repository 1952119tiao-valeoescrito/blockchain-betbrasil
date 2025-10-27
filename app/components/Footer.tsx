'use client';

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="w-full bg-slate-900 mt-auto border-t border-slate-700">
      <div className="container mx-auto text-center p-6 text-slate-400 text-sm">
        <p className="mb-2">© 2024 Blockchain Bet Brasil. Todos os direitos reservados.</p>
        <p className="mt-2 text-xs">Source: 601700 | Auditoria de Segurança Ativa</p>
        <div className="flex justify-center gap-4 mt-4">
          <button 
            className="hover:text-emerald-400 transition-colors duration-200" 
            onClick={() => handleNavClick('/termos')}
          >
            Termos de Uso
          </button>
          <span>|</span>
          <button 
            className="hover:text-emerald-400 transition-colors duration-200" 
            onClick={() => handleNavClick('/privacidade')}
          >
            Política de Privacidade
          </button>
        </div>
      </div>
    </footer>
  );
}