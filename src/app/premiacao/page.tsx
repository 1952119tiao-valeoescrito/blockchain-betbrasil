"use client";

import Navbar from "../../components/Navbar";
import { Trophy, ArrowDown, ShieldCheck, PieChart } from "lucide-react";

export default function Premiacao() {
  return (
    <main className="min-h-screen bg-[#0b0c10] text-gray-200 font-sans selection:bg-[#cfb16d] selection:text-black">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#cfb16d] mb-4 uppercase tracking-widest">
                Estrutura de Premiação
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                O protocolo distribui <strong>90%</strong> de tudo que é arrecadado diretamente aos participantes.
                Sem intermediários, regido por Smart Contracts.
            </p>
        </div>

        {/* BLOCO 1: DISTRIBUIÇÃO DAS FAIXAS (5 PONTOS) */}
        <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-[#13151a] border border-[#2a2d35] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <PieChart size={100} className="text-[#cfb16d]" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Trophy className="text-[#cfb16d]" /> Distribuição do Pote
                </h2>

                <div className="space-y-4">
                    {/* Faixa 1 (5 Pontos) */}
                    <div className="flex items-center gap-4 bg-[#0b0c10] p-4 rounded-xl border border-[#2a2d35] hover:border-[#cfb16d] transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#cfb16d] text-black flex items-center justify-center font-bold text-xl">5</div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold">Acertar 5 Pares</h3>
                            <p className="text-xs text-gray-500">Pontuação Máxima</p>
                        </div>
                        <div className="text-[#cfb16d] font-bold text-2xl">50%</div>
                    </div>

                    {/* Faixa 2 (4 Pontos) */}
                    <div className="flex items-center gap-4 bg-[#0b0c10] p-4 rounded-xl border border-[#2a2d35]">
                        <div className="w-12 h-12 rounded-full bg-[#1a1c22] text-gray-400 flex items-center justify-center font-bold text-xl">4</div>
                        <div className="flex-1">
                            <h3 className="text-gray-300 font-bold">Acertar 4 Pares</h3>
                        </div>
                        <div className="text-gray-400 font-bold text-xl">20%</div>
                    </div>

                    {/* Faixa 3 (3 Pontos) */}
                    <div className="flex items-center gap-4 bg-[#0b0c10] p-4 rounded-xl border border-[#2a2d35]">
                        <div className="w-12 h-12 rounded-full bg-[#1a1c22] text-gray-400 flex items-center justify-center font-bold text-xl">3</div>
                        <div className="flex-1">
                            <h3 className="text-gray-300 font-bold">Acertar 3 Pares</h3>
                        </div>
                        <div className="text-gray-400 font-bold text-xl">15%</div>
                    </div>

                    {/* Faixa 4 (2 Pontos) */}
                    <div className="flex items-center gap-4 bg-[#0b0c10] p-4 rounded-xl border border-[#2a2d35]">
                        <div className="w-12 h-12 rounded-full bg-[#1a1c22] text-gray-400 flex items-center justify-center font-bold text-xl">2</div>
                        <div className="flex-1">
                            <h3 className="text-gray-300 font-bold">Acertar 2 Pares</h3>
                        </div>
                        <div className="text-gray-400 font-bold text-xl">10%</div>
                    </div>

                    {/* Faixa 5 (1 Ponto) */}
                    <div className="flex items-center gap-4 bg-[#0b0c10] p-4 rounded-xl border border-[#2a2d35]">
                        <div className="w-12 h-12 rounded-full bg-[#1a1c22] text-gray-400 flex items-center justify-center font-bold text-xl">1</div>
                        <div className="flex-1">
                            <h3 className="text-gray-300 font-bold">Acertar 1 Par</h3>
                        </div>
                        <div className="text-gray-400 font-bold text-xl">5%</div>
                    </div>
                </div>
            </div>
        </div>

        {/* BLOCO 2: LÓGICA DE CASCATA */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 border border-[#cfb16d]/30 rounded-2xl bg-[#13151a]">
                <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                    <ArrowDown className="text-[#cfb16d]" /> Sistema de Cascata
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed">
                    Se não houver ganhadores na faixa de 5 pontos, o valor de <strong>50%</strong> não fica para a casa. 
                    Ele "desce" integralmente para a faixa de 4 pontos.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Isso se repete sucessivamente. Se ninguém acertar nada nas faixas superiores, o prêmio acumula 
                    para quem acertou apenas <strong>1 ponto</strong>.
                </p>
            </div>

            <div className="p-8 border border-[#cfb16d]/30 rounded-2xl bg-[#13151a]">
                <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                    <ShieldCheck className="text-[#cfb16d]" /> Rollover (Acumulado)
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed">
                    Na remota hipótese de <strong>nenhum participante</strong> acertar sequer 1 ponto na rodada, 
                    o montante total fica retido no Smart Contract.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Esse valor é somado automaticamente ao pote da <strong>próxima rodada</strong>, 
                    criando prêmios gigantescos (Jackpots).
                </p>
            </div>
        </div>
        
        {/* BLOCO 3: MODALIDADES */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">Modalidades de Adesão</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 border border-[#2a2d35] rounded-2xl bg-[#0b0c10] hover:border-[#cfb16d] transition-colors">
                <h3 className="text-2xl font-bold mb-2 text-white">Adesão Básica</h3>
                <p className="text-[#cfb16d] font-bold mb-4">$1.00 USD <span className="text-xs text-gray-500 font-normal">(~0.00027 ETH)</span></p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
                    <li>Entrada acessível.</li>
                    <li>Participa do Pote Básico.</li>
                    <li>Ideal para estratégias de múltiplas aplicações.</li>
                </ul>
            </div>

            <div className="p-8 border border-[#cfb16d] rounded-2xl bg-gradient-to-br from-[#1a1500] to-[#0b0c10] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#cfb16d] text-black font-bold px-3 py-1 text-[10px] uppercase">Alta Performance</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Inter-Bet <span className="text-[#cfb16d]">Pro</span></h3>
                <p className="text-[#cfb16d] font-bold mb-4">$170.00 USD <span className="text-xs text-gray-500 font-normal">(~0.0459 ETH)</span></p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                    <li>Pote exclusivo de alto volume.</li>
                    <li>Menor concorrência por fração do prêmio.</li>
                    <li>Pagamento imediato via Blockchain.</li>
                </ul>
            </div>
        </div>

      </div>
    </main>
  );
}