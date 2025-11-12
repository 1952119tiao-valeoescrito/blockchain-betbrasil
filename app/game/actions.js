'use server';

import { gameServer } from '@/lib/socket';

export async function submitSelection(selections) {
  try {
    // Atualiza o heatmap com as escolhas do jogador
    selections.forEach(coord => {
      const key = `${coord.x}_${coord.y}`;
      gameServer.heatmapData[key] = (gameServer.heatmapData[key] || 0) + 1;
    });

    gameServer.broadcastUpdate();
    
    return { success: true, message: 'Escolhas registradas!' };
  } catch (error) {
    return { success: false, error: 'Erro ao processar escolhas' };
  }
}

export async function getInitialHeatmap() {
  return gameServer.heatmapData;
}