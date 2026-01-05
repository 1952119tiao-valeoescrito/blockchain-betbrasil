"use client";
import { useTranslations } from 'next-intl';

import Navbar from "../../../components/Navbar";
import { CheckCircle2, Cpu, Coins, Search, FileText, Eye, ExternalLink, ShieldCheck } from "lucide-react";

export default function ComoFunciona() {
  // Gera os números de 1 a 25 para montar a matriz
  const nums = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-[#0b0c10] text-gray-200 font-sans selection:bg-[#cfb16d] selection:text-black">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        
        {/* CABEÇALHO */}
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
        <div className="max-w-6xl mx-auto bg-[#13151a] border border-[#2a2d35] rounded-2xl p-6 shadow-2xl mb-20">
            
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Tabela de Prognósticos (X/Y)</h3>
                <div className="text-xs text-gray-500 bg-[#0b0c10] px-3 py-1 rounded border border-[#2a2d35]">
                    Role para visualizar ↕
                </div>
            </div>

            {/* A TABELA DE 625 ITENS */}
            <div className="overflow-x-auto overflow-y-auto max-h-[500px] border border-[#2a2d35] rounded-lg scrollbar-thin scrollbar-thumb-[#cfb16d] scrollbar-track-[#0b0c10]">
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
                                <td className="p-3 bg-[#13151a] border-r border-[#2a2d35] text-[#cfb16d] font-bold text-xs sticky left-0 z-10">
                                    X-{x}
                                </td>
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
                    REALIZAR APLICAÇÃO AGORA
                </a>
            </div>
        </div>

        {/* --- REGRAS RÁPIDAS (Dias Corrigidos: Sábado/Domingo) --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
            
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
                <h4 className="text-white font-bold mb-2 text-lg">2. Ciclo Semanal</h4>
                <p className="text-sm text-gray-400">
                    A rodada fecha no <strong>Sábado</strong>. A Chainlink VRF audita e insere os resultados on-chain para garantir entropia real.
                </p>
            </div>

            <div className="p-6 bg-[#13151a] border border-[#2a2d35] rounded-xl hover:border-[#cfb16d]/50 transition-colors group">
                <div className="mb-4 text-[#cfb16d] bg-[#cfb16d]/10 w-fit p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Coins size={24} />
                </div>
                <h4 className="text-white font-bold mb-2 text-lg">3. Apuração aos Domingos</h4>
                <p className="text-sm text-gray-400">
                    Após o sorteio de sábado, o cálculo da cascata ocorre e os vencedores reivindicam seus rendimentos aos <strong>Domingos</strong>.
                </p>
            </div>
        </div>

        {/* --- TUTORIAL DE AUDITORIA --- */}
        <div className="max-w-4xl mx-auto bg-[#0f1014] border border-[#2a2d35] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#cfb16d]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <ShieldCheck className="text-[#cfb16d]" size={32} />
                Como Auditar sua Aplicação?
            </h2>

            <div className="space-y-8 relative z-10">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1c22] border border-[#2a2d35] flex items-center justify-center text-[#cfb16d] font-bold">1</div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Acesse o Comprovante (BaseScan)</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            Ao confirmar sua aplicação, você receberá um link para o <strong>BaseScan</strong>. Você também pode encontrá-lo no histórico da sua carteira.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#13151a] rounded border border-[#2a2d35] text-xs text-blue-400">
                            <ExternalLink size={12} /> View on block explorer
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1c22] border border-[#2a2d35] flex items-center justify-center text-[#cfb16d] font-bold">2</div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Decodifique os Dados</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            No BaseScan, role até a aba <strong>Overview</strong> e clique no botão <strong>"Decode Input Data"</strong>. Isso traduzirá o código da blockchain para números legíveis.
                        </p>
                        
                        <div className="bg-white text-black p-4 rounded-lg font-mono text-xs shadow-lg max-w-md border-l-4 border-[#cfb16d]">
                            <div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
                                <span className="font-bold text-gray-600">Input Data</span>
                                <span className="bg-gray-200 px-2 py-0.5 rounded text-[10px]">Decoded</span>
                            </div>
                            <div className="space-y-1">
                                <p><span className="text-gray-500">Function:</span> realizarAplicacao(uint8[10] _prognosticos)</p>
                                <p><span className="text-gray-500">MethodID:</span> 0x8b...3a</p>
                                <div className="mt-2 bg-gray-100 p-2 rounded">
                                    <span className="text-gray-500">[0]:</span> <span className="font-bold text-blue-600">_prognosticos</span> (uint8[])
                                    <br/>
                                    <span className="ml-4 text-black">[ 1, 1, 15, 3, 25, 25, 8, 2, 10, 10 ]</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 italic">
                            *Exemplo: Aqui você vê seus números (1/1, 15/3, 25/25...) gravados eternamente.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a1c22] border border-[#2a2d35] flex items-center justify-center text-[#cfb16d] font-bold">3</div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Confirmação Imutável</h3>
                        <p className="text-gray-400 text-sm">
                            Uma vez confirmado o bloco, <strong>ninguém</strong> (nem os desenvolvedores) pode alterar seus números. Seus prognósticos estão seguros matematicamente até o momento da apuração.
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}