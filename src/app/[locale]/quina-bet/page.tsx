"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Navbar from '@/components/Navbar';
import { ShieldCheck, ArrowRight, Zap, Target, Sparkles, Trash2, LayoutGrid, Loader2, CheckCircle2, ExternalLink } from 'lucide-react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { QUINA_BET_ADDRESS, QUINA_BET_ABI } from '@/constants/quinaBetAbi';

interface VolumeSlot {
  x: number;
  y: number;
}

export default function QuinaBetPage() {
  const t = useTranslations('QuinaBet');
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending: isWaitingSignature, error } = useWriteContract();
  const { isLoading: isConfirmingOnChain, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash });
  
  const [selection, setSelection] = useState<VolumeSlot[]>([]);
  const selectedCount = selection.length;

  const toggleCoordinate = (x: number, y: number) => {
    const coord: VolumeSlot = { x, y };
    const isSelected = selection.some(s => s.x === x && s.y === y);
    
    if (isSelected) {
      setSelection((prev) => prev.filter(s => !(s.x === x && s.y === y)));
    } else if (selectedCount < 25) {
      setSelection((prev) => [...prev, coord]);
    }
  };

  const removeSlot = (index: number) => {
    setSelection((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setSelection([]);
  };

  const handleRandom = () => {
    const selectedCoords = new Set<string>();
    const newSlots: VolumeSlot[] = [];
    
    while (newSlots.length < 25) {
      const randomX = Math.floor(Math.random() * 25) + 1;
      const randomY = Math.floor(Math.random() * 25) + 1;
      const key = `${randomX}/${randomY}`;
      
      if (!selectedCoords.has(key)) {
        selectedCoords.add(key);
        newSlots.push({ x: randomX, y: randomY });
      }
    }
    setSelection(newSlots);
  };

  const isCoordinateSelected = (x: number, y: number) => {
    return selection.some(s => s.x === x && s.y === y);
  };

  const convertToPrognosticos = (): number[] => {
    // Converte coordenadas (x,y) para array de números de 1-625
    return selection.map(coord => (coord.x - 1) * 25 + coord.y);
  };

  const handleBet = async () => {
    if (!isConnected) return;
    if (selectedCount !== 25) return;

    const prognosticos = convertToPrognosticos();

    try {
      writeContract({
        address: QUINA_BET_ADDRESS as `0x${string}`,
        abi: QUINA_BET_ABI,
        functionName: 'realizarApostaQuina',
        args: [prognosticos as unknown as any],
      } as any);
    } catch (err) {
      console.error('Erro ao enviar aposta:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* HEADER */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{t('highlight')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">{t('subtitle')}</p>
        </header>

        {/* GAME INFO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-amber-900/20 border-2 border-amber-700/30 rounded-2xl p-6 text-center">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{t('rulesTitle')}</h3>
            <p className="text-2xl font-black text-amber-300">25 {t('numbersLabel')}</p>
            <p className="text-xs text-gray-500 mt-2">{t('rule1')}</p>
          </div>

          <div className="bg-amber-900/20 border-2 border-amber-700/30 rounded-2xl p-6 text-center">
            <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{t('goalTitle')}</h3>
            <p className="text-2xl font-black text-amber-300">5/5 {t('matches')}</p>
            <p className="text-xs text-gray-500 mt-2">{t('rule2')}</p>
          </div>

          <div className="bg-amber-900/20 border-2 border-amber-700/30 rounded-2xl p-6 text-center">
            <Zap className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{t('priceTitle')}</h3>
            <p className="text-2xl font-black text-amber-300">1 USDC</p>
            <p className="text-xs text-gray-500 mt-2">{t('rule3')}</p>
          </div>
        </div>

        {/* MAIN BETTING AREA */}
        <div className="bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-x-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-max lg:min-w-full">
            
            {/* LEFT: 25x25 SELECTION MATRIX */}
            <div className="flex flex-col">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <LayoutGrid className="text-amber-400" />
                  <h2 className="text-xl font-black text-white uppercase">{t('matrixTitle')}</h2>
                </div>
                <p className="text-sm text-gray-400">{t('matrixInstruction')}</p>
              </div>

              {/* MATRIZ 25x25 COM COORDENADAS */}
              <div className="overflow-x-auto pb-4 bg-black/40 rounded-xl p-4 border border-slate-700 shadow-inner mb-4">
                <div className="grid gap-1 min-w-fit" style={{ gridTemplateColumns: 'repeat(26, 1fr)' }}>
                  
                  {/* Cabeçalho X (números 1-25) */}
                  <div className="h-6" />
                  {Array.from({ length: 25 }, (_, i) => (
                    <div key={`col-${i}`} className="text-[10px] text-gray-500 font-bold flex items-center justify-center uppercase font-mono h-6">
                      {i + 1}
                    </div>
                  ))}

                  {/* Linhas Y + Células */}
                  {Array.from({ length: 25 }, (_, row) => (
                    <React.Fragment key={`row-${row}`}>
                      <div className="text-[10px] text-gray-500 font-bold flex items-center justify-center uppercase font-mono">{row + 1}</div>
                      {Array.from({ length: 25 }, (_, col) => {
                        const x = col + 1;
                        const y = row + 1;
                        const isSelected = isCoordinateSelected(x, y);
                        const coord = `${x}/${y}`;
                        
                        return (
                          <button
                            key={coord}
                            disabled={selectedCount >= 25 && !isSelected}
                            onClick={() => toggleCoordinate(x, y)}
                            className={`w-8 h-8 border rounded-sm flex items-center justify-center group transition-all text-[7px] font-mono font-bold
                              ${isSelected
                                ? 'bg-amber-500 border-amber-300 text-black z-10 scale-110 shadow-[0_0_15px_rgba(217,119,6,0.6)]'
                                : 'bg-slate-800/50 border-slate-700 text-gray-500 hover:bg-amber-500/20 hover:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
                              }`}
                          >
                            <span className={`transition-colors ${isSelected ? 'text-black' : 'group-hover:text-amber-200'}`}>
                              {coord}
                            </span>
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* PROGRESS */}
              <div className="bg-slate-800/50 rounded-full h-2 overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300"
                  style={{ width: `${(selectedCount / 25) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center font-mono mb-4">{selectedCount}/25 {t('selected')}</p>

              {/* CONTROLS */}
              <div className="flex gap-2">
                <button
                  onClick={handleRandom}
                  className="flex-1 px-4 py-2 bg-amber-600/30 border border-amber-500/50 rounded-lg text-amber-300 font-bold text-sm hover:bg-amber-600/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedCount === 25}
                >
                  {t('btnRandom')}
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300 font-bold text-sm hover:bg-slate-700 transition-all"
                >
                  {t('btnClear')}
                </button>
              </div>
            </div>

            {/* RIGHT: VOLANTE (5x5 TICKET) */}
            <div className="flex flex-col">
              <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight">
                {t('volumeTitle')} <span className="text-amber-300">({selectedCount}/25)</span>
              </h2>

              <div className="bg-black/40 border border-amber-500/30 rounded-xl p-4 overflow-x-auto">
                <table className="w-full text-center min-w-fit">
                  <thead>
                    <tr>
                      <th className="w-12 px-2 py-2 text-xs font-bold text-gray-400 border-b border-slate-700" />
                      <th className="px-3 py-2 text-xs font-bold text-amber-300 border-b border-slate-700 uppercase">{t('col1')}</th>
                      <th className="px-3 py-2 text-xs font-bold text-amber-300 border-b border-slate-700 uppercase">{t('col2')}</th>
                      <th className="px-3 py-2 text-xs font-bold text-amber-300 border-b border-slate-700 uppercase">{t('col3')}</th>
                      <th className="px-3 py-2 text-xs font-bold text-amber-300 border-b border-slate-700 uppercase">{t('col4')}</th>
                      <th className="px-3 py-2 text-xs font-bold text-amber-300 border-b border-slate-700 uppercase">{t('col5')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row}>
                        <td className="px-2 py-3 text-xs font-bold text-gray-400 border-r border-slate-700 text-right w-12">
                          {row}
                        </td>
                        {[1, 2, 3, 4, 5].map((col) => {
                          const slotIndex = (row - 1) * 5 + (col - 1);
                          const slot = selection[slotIndex];
                          return (
                            <td
                              key={`${row}-${col}`}
                              className="px-3 py-3 border border-slate-700/50 text-sm font-mono relative group"
                            >
                              {slot ? (
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-amber-300 font-black">
                                    {slot.x}/{slot.y}
                                  </span>
                                  <button
                                    onClick={() => removeSlot(slotIndex)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-1 top-1 p-1 bg-red-600/30 hover:bg-red-600/50 rounded text-red-300"
                                    title={t('deleteBtnTitle')}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-gray-500 text-xs">-- / --</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center font-mono">{t('volumeHint')}</p>
            </div>
          </div>

          {/* ACTION BUTTONS - FULL WIDTH */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {!isConnected ? (
              <div className="flex-1">
                <ConnectButton label="Conectar Carteira" />
              </div>
            ) : isTxSuccess ? (
              <div className="flex-1 bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center animate-in zoom-in-95">
                <CheckCircle2 className="text-green-500 mx-auto mb-3" size={40} />
                <p className="text-green-500 font-black text-sm uppercase">{t('betConfirmed') || 'Aposta Registrada!'}</p>
                {hash && (
                  <a href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noreferrer" className="text-[10px] text-white underline mt-4 block uppercase font-bold flex items-center justify-center gap-1">
                    Ver no BaseScan <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={handleBet}
                  disabled={selectedCount !== 25 || isWaitingSignature || isConfirmingOnChain}
                  className={`
                    flex-1 py-4 font-black text-lg rounded-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-2
                    ${selectedCount === 25 && !isWaitingSignature && !isConfirmingOnChain
                      ? 'bg-amber-500 text-black hover:scale-105 shadow-[0_0_30px_rgba(217,119,6,0.3)]'
                      : 'bg-slate-700 text-gray-500 cursor-not-allowed opacity-50'
                    }
                  `}
                >
                  {isWaitingSignature ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Assine na Carteira
                    </>
                  ) : isConfirmingOnChain ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Confirmando...
                    </>
                  ) : (
                    <>
                      {t('btnBet')} <ArrowRight size={20} />
                    </>
                  )}
                </button>
                <Link href="/quina-bet/como-funciona" className="flex-1">
                  <button className="w-full py-4 font-bold text-lg rounded-xl uppercase tracking-tighter transition-all border border-slate-600 text-gray-300 hover:bg-white/5">
                    {t('btnInfo')}
                  </button>
                </Link>
              </>
            )}
          </div>

          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center">
              <p className="text-[10px] text-red-500 font-bold uppercase leading-tight">
                {error.message?.includes("rejected") ? "Usuário recusou transação" : "Saldo insuficiente ou erro na rede"}
              </p>
            </div>
          )}
        </div>

        {/* HIGHLIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/40 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-white mb-2">{t('highlight1Title')}</h3>
                <p className="text-sm text-gray-400">{t('highlight1Desc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex gap-3 mb-3">
              <Zap className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-white mb-2">{t('highlight2Title')}</h3>
                <p className="text-sm text-gray-400">{t('highlight2Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
