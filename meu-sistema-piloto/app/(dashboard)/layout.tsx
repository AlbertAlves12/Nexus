'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BarChart3, Settings, Sparkles } from 'lucide-react';
import SairButton from '@/components/layout/SairButton';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { label: 'Visão geral', href: '/', icon: LayoutDashboard },
    { label: 'Clientes', href: '/clientes', icon: Users },
    { label: 'Relatórios', href: '/relatorios', icon: BarChart3 },
    { label: 'Configurações', href: '/configuracoes', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      <aside className="w-64 bg-[#1E2330] text-slate-200 flex flex-col justify-between p-4 shrink-0 font-sans">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 bg-[#C86235] text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-sm">
              p.
            </div>
            <span className="font-bold text-lg text-white tracking-tight">sistema piloto</span>
          </div>

          <div className="bg-[#272D3D] p-3 rounded-xl flex items-center gap-3 border border-slate-700/50">
            <div className="w-8 h-8 bg-[#C86235] text-white font-bold rounded-lg flex items-center justify-center text-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Albert Tech</p>
              <p className="text-xs text-slate-400 truncate">Espaço de trabalho</p>
            </div>
          </div>

          <nav className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Menu
            </p>
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#2E3648] text-white'
                      : 'text-slate-400 hover:bg-[#272D3D] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="bg-[#272D3D]/70 p-4 rounded-xl border border-slate-700/40">
            <div className="w-7 h-7 bg-[#C86235]/20 rounded-lg flex items-center justify-center text-[#C86235] mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Pequenos passos, boas relações.</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mantenha seus contatos organizados e o próximo passo sempre à vista.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between px-1">
            <SairButton />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 px-8 flex items-center justify-between border-b border-slate-200/80 bg-white/60 backdrop-blur-sm">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <span>Sistema Piloto</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold capitalize">
              {pathname === '/' ? 'Visão geral' : pathname.replace('/', '')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Albert</span>
            <div className="w-8 h-8 rounded-full bg-[#EADCCF] text-[#7A4B2A] flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>

        <div className="p-8 flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}