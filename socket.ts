// lib/socket.ts
export const gameServer = {
  heatmapData: {},
  
  emit: (event: string, data: any) => {
    console.log('Socket emit:', event, data);
  },
  
  broadcastUpdate: () => {
    console.log('Broadcasting update');
  }
};