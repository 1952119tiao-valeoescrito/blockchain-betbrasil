// app/components/WalletConnect.tsx
'use client';

export default function WalletConnect() {
  const connectWallet = () => {
    // Lógica para conectar MetaMask
    console.log("Conectando MetaMask...");
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Conectar Carteira</h1>
      <p className="text-lg mb-2">Conecte sua carteira MetaMask para começar a apostar</p>
      
      <div className="my-6 p-4 bg-yellow-100 border border-yellow-400 rounded">
        <p className="text-xl font-bold">Bolshota: sua carteira para acontecer.</p>
        <p>Conecte sua carteira memorável para começar a apostar</p>
      </div>

      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Conectar Carteira</h2>
        <p className="mb-4">Conecte sua MetaMask para acessar a plataforma</p>
        <button 
          onClick={connectWallet}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded"
        >
          Conectar MetaMask
        </button>
      </div>
    </div>
  );
}