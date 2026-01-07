"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useTranslations } from 'next-intl';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { LayoutGrid, ShieldCheck, Trash2, CheckCircle2, Loader2 } from 'lucide-react';

export default function ApostasPage() {
  const t = useTranslations('Apostas');
  const { isConnected } = useAccount();
  
  // ESTADOS
  const [selectedCoords, setSelectedCoords] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false); // Estado de carregamento
  const [isSuccess, setIsSuccess] = useState(false); // Estado de sucesso

  // SELECIONAR/DESELECIONAR
  const toggleCoordinate = (coord: string) => {
    if (isConfirming) return; // Bloqueia cliques se estiver confirmando
    if (selectedCoords.includes(coord)) {
      setSelectedCoords(selectedCoords.filter(c => c !== coord));
      setIsSuccess(false);
    } else {
      if (selectedCoords.length < 5) {
        setSelectedCoords([...selectedCoords, coord]);
      }
    }
  };

  // FUNÇÃO DE CONFIRMAÇÃO (Ação do Botão)
  const handleConfirm = async () => {
    if (selectedCoords.length !== 5) return;

    setIsConfirming(true);
    
    // SIMULAÇÃO DE CHAMADA AO SMART CONTRACT
    // Aqui no futuro entra o seu writeContract da wagmi
    try {
      console.log("Enviando coordenadas para a Base Network:", selectedCoords);
      
      // Simulando 3 segundos de processamento na blockchain
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIsSuccess(true);
      // Opcional: alert("Aposta registrada com sucesso na Blockchain!");
    } catch (error) {
      console.error("Erro ao confirmar:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  const clearSelection = () => {
    setSelectedCoords([]);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-8">
          
          {/* LADO ESQUERDO: MATRIZ INTERATIVA */}
          <div className="bg-slate-900/40 p-4 md:p-8 rounded-3xl border border-white/10 text-left">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutGrid className="text-yellow-500" />
                <div>
                  <h2 className="text-xl font-black text-white uppercase">{t('matrixTitle')}</h2>
                  <p className="text-xs text-gray-400">{t('matrixSub')}</p>
                </div>
              </div>
              {selectedCoords.length > 0 && !isConfirming && (
                <button onClick={clearSelection} className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 uppercase font-bold transition-colors">
                  <Trash2 size={12} /> Limpar
                </button>
              )}
            </div>

            <div className="overflow-x-auto pb-4 custom-scrollbar bg-black/20 rounded-xl p-2 md:p-4 border border-white/5 text-center">
               <div className="grid grid-cols-[30px_repeat(25,1fr)] gap-1 min-w-[850px]">
                  <div className="h-6"></div>
                  {Array.from({ length: 25 }, (_, i) => (
                    <div key={`col-${i}`} className="text-[10px] text-gray-600 font-bold flex items-center justify-center uppercase">{i + 1}</div>
                  ))}

                  {Array.from({ length: 25 }, (_, row) => (
                    <React.Fragment key={`row-frag-${row}`}>
                      <div className="text-[10px] text-gray-600 font-bold flex items-center justify-center uppercase">{row + 1}</div>
                      {Array.from({ length: 25 }, (_, col) => {
                        const x = col + 1;
                        const y = row + 1;
                        const coord = `${x}/${y}`;
                        const isSelected = selectedCoords.includes(coord);

                        return (
                          <button 
                            key={coord} 
                            disabled={isConfirming}
                            onClick={() => toggleCoordinate(coord)}
                            className={`aspect-square border transition-all rounded-sm flex items-center justify-center group
                              ${isSelected 
                                ? 'bg-yellow-500 border-yellow-300 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] z-10 scale-110' 
                                : 'bg-white/5 border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10'
                              } ${isConfirming ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <span className={`text-[7px] md:text-[8px] font-mono font-bold
                              ${isSelected ? 'text-black' : 'text-gray-700 group-hover:text-yellow-200'}`}>
                              {coord}
                            </span>
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
               </div>
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO DE REGISTRO */}
          <div className="bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-yellow-500/20 h-fit sticky top-28">
             <h3 className="text-lg font-black text-white uppercase mb-6 text-center border-b border-white/5 pb-4">
                {t('title')}
             </h3>
             
             <div className="space-y-3 mb-8">
                {[0, 1, 2, 3, 4].map((index) => (
                   <div key={index} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Nº 0{index + 1}</span>
                      {selectedCoords[index] ? (
                        <span className="text-yellow-500 font-mono font-black text-lg animate-in zoom-in-50">{selectedCoords[index]}</span>
                      ) : (
                        <span className="text-gray-700 font-mono text-sm italic">{t('empty')}</span>
                      )}
                   </div>
                ))}
             </div>

             <div className="flex flex-col items-center gap-6">
                {!isConnected ? (
                  <>
                    <p className="text-gray-500 text-sm italic text-center px-4">{t('alertWallet')}</p>
                    <ConnectButton />
                  </>
                ) : (
                  <>
                    {isSuccess ? (
                      <div className="w-full bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center animate-in fade-in zoom-in-95">
                        <CheckCircle2 className="text-green-500 mx-auto mb-2" size={32} />
                        <p className="text-green-500 font-bold uppercase text-xs tracking-widest text-center">Entrada Registrada!</p>
                        <p className="text-gray-400 text-[10px] mt-1 text-center">Verifique no BaseScan em instantes.</p>
                        <button onClick={clearSelection} className="mt-4 text-white underline text-[10px] uppercase font-bold">Nova Aposta</button>
                      </div>
                    ) : (
                      <button 
                        onClick={handleConfirm}
                        disabled={selectedCoords.length < 5 || isConfirming}
                        className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2
                          ${selectedCoords.length === 5 && !isConfirming
                            ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:scale-[1.02]' 
                            : 'bg-white/5 text-gray-600 cursor-not-allowed opacity-50'}`}
                      >
                        {isConfirming ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Gravando...
                          </>
                        ) : (
                          <>
                            {selectedCoords.length === 5 && <CheckCircle2 size={18} />}
                            {t('btnConfirm')}
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}

                <div className="w-full h-[1px] bg-white/5 my-2 text-center"></div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase justify-center">
                    <ShieldCheck size={14} className="text-green-500" />
                    {t('audit')}
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}