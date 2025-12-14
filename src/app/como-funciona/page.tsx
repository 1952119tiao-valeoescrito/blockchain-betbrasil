"use client";

import Navbar from "../../components/Navbar";
import { CheckCircle2, Cpu, Coins } from "lucide-react"; // Adicionei ícones para ficar mais visual

export default function ComoFunciona() {
  // Gera os números de 1 a 25 para montar a matriz
  const nums = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-[#0b0c10] text-gray-200 font-sans selection:bg-[#cfb16d] selection:text-black">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#cfb16d] mb-4 uppercase tracking-widest">
                Matriz de Referência
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Entenda a matemática do sistema. A adesão consiste na seleção estratégica de pares (X/Y).
                Existem exatos <strong>625 prognósticos possíveis</strong> auditáveis via Smart Contract.
            </p>
        </div>
        
        {/* Container da Tabela (Estilo Card) */}
        <div className="max-w-6xl mx-auto bg-[#13151a] border border-[#2a2d35] rounded-2xl p-6 shadow-2xl">
            
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Tabela de Prognósticos (X/Y)</h3>
                <div className="text-xs text-gray-500 bg-[#0b0c10] px-3 py-1 rounded border border-[#2a2d35]">
                    Role para visualizar ↕
                </div>
            </div>

            {/* A TABELA DE 625 ITENS */}
            <div className="overflow-x-auto overflow-y-auto max-h-[600px] border border-[#2a2d35] rounded-lg scrollbar-thin scrollbar-thumb-[#cfb16d] scrollbar-track-[#0b0c10]">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-[#1a1c22] sticky top-0 z-10">
                        <tr>
                            <th className="p-3 text-[#cfb16d] border-b border-[#2a2d35] font-bold text-sm">EIXO X ↓</th>
                            {nums.map(y => (
                                <th key={y} className="p-3 text-gray-400 border-b border-[#2a2d35] text-xs font-mono min-w-[50px]">
                                    Y-{y}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-[#0b0c10]">
                        {nums.map(x => (
                            <tr key={x} className="hover:bg-[#1e2029] transition-colors">
                                {/* Coluna Indicadora do X */}
                                <td className="p-3 bg-[#13151a] border-r border-[#2a2d35] text-[#cfb16d] font-bold text-xs sticky left-0 z-10">
                                    X-{x}
                                </td>
                                
                                {/* Células da Matriz (1/1, 1/2, etc) */}
                                {nums.map(y => (
                                    <td key={`${x}-${y}`} className="p-2 border border-[#1a1c22] text-xs text-gray-500 font-mono hover:text-white hover:bg-[#cfb16d]/20 cursor-default">
                                        {x}/{y}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 mb-4">
                    A cada rodada, 5 prognósticos são validados pela Chainlink. A probabilidade é imutável e verificável na Blockchain.
                </p>
                <a 
                    href="/apostas" 
                    className="inline-block px-8 py-3 bg-[#cfb16d] text-black font-bold rounded-lg hover:bg-[#b59a5e] transition-all shadow-[0_0_20px_rgba(207,177,109,0.2)]"
                >
                    REALIZAR APLICAÇÃO
                </a>
            </div>

        </div>

        {/* Regras Rápidas (Ajustadas para o Contrato Otimizado) */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            
            <div className="p-6 bg-[#13151a] border border-[#2a2d35] rounded-xl hover:border-[#cfb16d]/50 transition-colors group">
                <div className="mb-4 text-[#cfb16d] bg-[#cfb16d]/10 w-fit p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={24} />
                </div>
                <h4 className="text-white font-bold mb-2 text-lg">1. Seleção de Prognósticos</h4>
                <p className="text-sm text-gray-400">
                    Escolha 5 coordenadas da Matriz (ex: 10/5, 25/25). A ordem de inserção define a faixa de pontuação (1 a 5 pontos).
                </p>
            </div>

            <div className="p-6 bg-[#13151a] border border-[#2a2d35] rounded-xl hover:border-[#cfb16d]/50 transition-colors group">
                <div className="mb-4 text-[#cfb16d] bg-[#cfb16d]/10 w-fit p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Cpu size={24} />
                </div>
                <h4 className="text-white font-bold mb-2 text-lg">2. Validação Trustless</h4>
                <p className="text-sm text-gray-400">
                    O oráculo Chainlink VRF insere os resultados on-chain automaticamente a cada 24 horas, garantindo entropia real.
                </p>
            </div>

            <div className="p-6 bg-[#13151a] border border-[#2a2d35] rounded-xl hover:border-[#cfb16d]/50 transition-colors group">
                <div className="mb-4 text-[#cfb16d] bg-[#cfb16d]/10 w-fit p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Coins size={24} />
                </div>
                <h4 className="text-white font-bold mb-2 text-lg">3. Apuração e Saque</h4>
                <p className="text-sm text-gray-400">
                    Após o sorteio e cálculo da cascata (90% payout), os vencedores <strong>reivindicam (sacam)</strong> seus rendimentos diretamente no painel.
                </p>
            </div>

        </div>

      </div>
    </main>
  );
}