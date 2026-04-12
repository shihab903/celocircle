'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { CELCOCIRCLE_ADDRESS, CELCOCIRCLE_ABI } from './celoCircleConfig';
import { useState } from 'react';

export default function App() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('0.1');
  const [maxMembers, setMaxMembers] = useState('5');
  const [circleId, setCircleId] = useState('');

  const createCircle = () => {
    if (!name.trim()) return alert("Please enter circle name");
    writeContract({
      address: CELCOCIRCLE_ADDRESS,
      abi: CELCOCIRCLE_ABI,
      functionName: 'createCircle',
      args: [name.trim(), parseEther(amount), BigInt(maxMembers)],
    });
  };

  const joinCircle = () => {
    if (!circleId) return alert("Please enter Circle ID");
    writeContract({
      address: CELCOCIRCLE_ADDRESS,
      abi: CELCOCIRCLE_ABI,
      functionName: 'joinCircle',
      args: [BigInt(circleId)],
    });
  };

  const contribute = () => {
    if (!circleId) return alert("Please enter Circle ID");
    writeContract({
      address: CELCOCIRCLE_ADDRESS,
      abi: CELCOCIRCLE_ABI,
      functionName: 'contribute',
      args: [BigInt(circleId)],
      value: parseEther(amount),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-black text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold">🇧🇩 CeloCircle</h1>
          <p className="text-2xl mt-3">Digital Savings Circle</p>
          <p className="text-emerald-400 mt-2">MiniPay • On-Chain • Transparent</p>
        </div>

        {isConnected ? (
          <div className="space-y-8">
            <div className="bg-white/10 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold mb-4">Create New Circle</h2>
              <input
                type="text"
                placeholder="Circle Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-white/20 rounded-2xl mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Amount (cUSD)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="p-4 bg-white/20 rounded-2xl"
                />
                <input
                  type="text"
                  placeholder="Max Members"
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(e.target.value)}
                  className="p-4 bg-white/20 rounded-2xl"
                />
              </div>
              <button
                onClick={createCircle}
                disabled={isConfirming}
                className="mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold text-lg"
              >
                {isConfirming ? 'Creating...' : 'Create Circle'}
              </button>
            </div>

            <div className="bg-white/10 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold mb-4">Join or Contribute</h2>
              <input
                type="text"
                placeholder="Circle ID"
                value={circleId}
                onChange={(e) => setCircleId(e.target.value)}
                className="w-full p-4 bg-white/20 rounded-2xl mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <button onClick={joinCircle} className="py-4 bg-blue-600 rounded-2xl font-bold">Join</button>
                <button onClick={contribute} className="py-4 bg-amber-600 rounded-2xl font-bold">Contribute</button>
              </div>
            </div>

            <p className="text-center text-sm opacity-70">
              Connected: {address ? `${address.slice(0,6)}...${address.slice(-4)}` : ''}
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-3xl">Open in MiniPay</p>
            <p className="mt-4 text-emerald-400">Wallet will connect automatically</p>
          </div>
        )}
      </div>
    </div>
  );
              }
