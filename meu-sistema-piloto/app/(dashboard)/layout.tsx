'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Wallet,
  MessageSquare,
  BarChart3,
  Settings,
  Sparkles,
  LogOut,
  Search,
  Bell,
  Command,
  Menu,
  X,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const menu = [
    { label: 'Visão geral', href: '/', icon: LayoutDashboard },
    { label: 'Clientes', href: '/clientes', icon: Users },
    { label: 'Atendimento', href: '/atendimento', icon: MessageSquare },
    { label: 'Financeiro', href: '/financeiro', icon: Wallet },
    { label: 'Relatórios', href: '/relatorios', icon: BarChart3 },
    { label: 'Configurações', href: '/configuracoes', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] font-sans antialiased">
      {/* Overlay para Mobile */}
      {sidebarAberta && (
        <div
          onClick={() => setSidebarAberta(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Principal (Fixa em Desktop, Gaveta em Mobile) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#1E2330] text-slate-200 flex flex-col justify-between p-5 shrink-0 transform transition-transform duration-200 ease-in-out ${
          sidebarAberta ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo do Sistema White-Label */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C86235] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md shadow-[#C86235]/20">
                p.
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight block">sistema piloto</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">White-Label Edition</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarAberta(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Seletor de Espaço de Trabalho (Tenant) */}
          <div className="bg-[#272D3D] p-3.5 rounded-xl flex items-center gap-3 border border-slate-700/50 shadow-inner">
            <div className="w-9 h-9 bg-[#C86235] text-white font-bold rounded-lg flex items-center justify-center text-sm shadow-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Albert Tech</p>
              <p className="text-xs text-slate-400 truncate">Plano Enterprise • 24 Meses</p>
            </div>
          </div>

          {/* Menu de Navegação */}
          <nav className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Módulos Principais
            </p>
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarAberta(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#2E3648] text-white shadow-sm border border-slate-600/40'
                      : 'text-slate-400 hover:bg-[#272D3D] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C86235]' : 'text-slate-400'}`} />
                    {item.label}
                  </div>
                  {item.label === 'Atendimento' && (
                    <span className="text-[10px] font-bold bg-[#C86235] text-white px-2 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bloco Inferior: Card Informativo & Sair */}
        <div className="space-y-4 pt-4 border-t border-slate-700/60">
          <div className="bg-[#272D3D]/80 p-4 rounded-xl border border-slate-700/50 shadow-sm">
            <div className="w-7 h-7 bg-[#C86235]/20 rounded-lg flex items-center justify-center text-[#C86235] mb-2.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Licença Ativa</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Sistema adaptado para contratação de 24 meses com opção de aquisição da licença.
            </p>
          </div>

          <div className="flex items-center justify-between px-1">
            <button className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              Sair da conta
            </button>
          </div>
        </div>
      </aside>

      {/* Conteúdo Central Ajustável */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Header Superior Responsivo */}
        <header className="h-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarAberta(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Trilha de Navegação */}
            <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-2">
              <span className="text-slate-400">Sistema Piloto</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold capitalize">
                {pathname === '/' ? 'Visão geral' : pathname.replace('/', '')}
              </span>
            </div>
          </div>

          {/* Barra de Busca Global e Perfil */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Campo de Busca Simulado */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100/80 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-400 w-64 lg:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="flex-1 truncate">Buscar clientes, faturas ou chamados...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 bg-white border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded text-[10px] font-medium shadow-2xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </div>

            {/* Botão Notificações */}
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C86235] rounded-full ring-2 ring-white" />
            </button>

            {/* Perfil do Usuário */}
            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">Albert Santos</p>
                <p className="text-[10px] text-slate-400">Administrador</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#EADCCF] text-[#7A4B2A] flex items-center justify-center font-bold text-sm shadow-2xs border border-[#C86235]/20">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Área de Conteúdo Expansível em Telas Grandes (max-w-[1600px]) */}
        <div className="p-4 sm:p-6 lg:p-8 xl:p-10 flex-1 max-w-[1600px] w-full mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
