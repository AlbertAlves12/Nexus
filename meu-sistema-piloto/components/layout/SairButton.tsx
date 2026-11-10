'use client';

import { LogOut } from 'lucide-react';

export default function SairButton() {
  return (
    <button
      onClick={() => alert('Sessão encerrada')}
      className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sair da conta
    </button>
  );
}