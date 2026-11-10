'use client';

import { useState, useEffect } from 'react';
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
  CheckSquare,
  Check,
  Trash2,
} from 'lucide-react';

interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  tempo: string;
  lida: boolean;
  tipo: 'atendimento' | 'financeiro' | 'atividade';
}

const NOTIFICACOES_INICIAIS: Notificacao[] = [
  {
    id: '1',
    titulo: 'Novo Chamado no WhatsApp',
    descricao: 'TechInovação solicitou a 2ª via da fatura.',
    tempo: 'Há 5 min',
    lida: false,
    tipo: 'atendimento',
  },
  {
    id: '2',
    titulo: 'Fatura #104 Quitada via PIX',
    descricao: 'Santos & Associados confirmou o pagamento de R$ 2.500,00.',
    tempo: 'Há 15 min',
    lida: false,
    tipo: 'financeiro',
  },
  {
    id: '3',
    titulo: 'Nova Solicitação no Portal',
    descricao: 'Distribuidora Borborema abriu um chamado fiscal.',
    tempo: 'Há 45 min',
    lida: false,
    tipo: 'atendimento',
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(NOTIFICACOES_INICIAIS);
  const [carregado, setCarregado] = useState(false);

  // Carregar Notificações do localStorage
  useEffect(() => {
    const salvos = localStorage.getItem('piloto_notificacoes');
    if (salvos) {
      try {
        setNotificacoes(JSON.parse(salvos));
      } catch (e) {
        console.error('Erro ao carregar notificações', e);
      }
    }
    setCarregado(true);
  }, []);

  // Salvar Notificações no localStorage
  useEffect(() => {
    if (carregado) {
      localStorage.setItem('piloto_notificacoes', JSON.stringify(notificacoes));
    }
  }, [notificacoes, carregado]);

  // Contadores dinâmicos
  const naoLidasCount = notificacoes.filter((n) => !n.lida).length;
  const atendimentoNaoLidosCount = notificacoes.filter((n) => n.tipo === 'atendimento' && !n.lida).length;

  const handleMarcarComoLida = (id: string) => {
    setNotificacoes(
      notificacoes.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const handleMarcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map((n) => ({ ...n, lida: true })));
  };

  const menu = [
    { label: 'Visão geral', href: '/', icon: LayoutDashboard },
    { label: 'Atividades', href: '/atividades', icon: CheckSquare },
    { label: 'Clientes', href: '/clientes', icon: Users },
    { label: 'Atendimento', href: '/atendimento', icon: MessageSquare },
    { label: 'Financeiro', href: '/financeiro', icon: Wallet },
    { label: 'Relatórios', href: '/relatorios', icon: BarChart3 },
    { label: 'Configurações', href: '/configuracoes', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] font-sans antialiased print:bg-white print:min-h-0">
      {/* Overlay para Mobile */}
      {sidebarAberta && (
        <div
          onClick={() => setSidebarAberta(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm print:hidden"
        />
      )}

      {/* Sidebar Principal */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#1E2330] text-slate-200 flex flex-col justify-between p-5 shrink-0 transform transition-transform duration-200 ease-in-out print:hidden ${
          sidebarAberta ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C86235] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md shadow-[#C86235]/20">
                p.
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight block">sistema piloto</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  White-Label Edition
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarAberta(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-[#272D3D] p-3.5 rounded-xl flex items-center gap-3 border border-slate-700/50 shadow-inner">
            <div className="w-9 h-9 bg-[#C86235] text-white font-bold rounded-lg flex items-center justify-center text-sm shadow-sm">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Albert Tech</p>
              <p className="text-xs text-slate-400 truncate">Plano Enterprise • 24 Meses</p>
            </div>
          </div>

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
                  {item.label === 'Atendimento' && atendimentoNaoLidosCount > 0 && (
                    <span className="text-[10px] font-bold bg-[#C86235] text-white px-2 py-0.5 rounded-full animate-pulse">
                      {atendimentoNaoLidosCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

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

      {/* Conteúdo Central */}
      <main className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden print:overflow-visible print:p-0">
        <header className="h-16 px-6 lg:px-10 border-b border-slate-200/80 bg-white/70 backdrop-blur-md flex items-center justify-between sticky top-0 z-30 w-full print:hidden">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarAberta(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-2">
              <span className="text-slate-400">Sistema Piloto</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold capitalize">
                {pathname === '/' ? 'Visão geral' : pathname.replace('/', '')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-2 bg-slate-100/80 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs text-slate-400 w-72 lg:w-96">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="flex-1 truncate">Buscar clientes, faturas ou atividades...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 bg-white border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded text-[10px] font-medium shadow-2xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </div>

            {/* Ícone do Sininho com Popover de Notificações */}
            <div className="relative">
              <button
                onClick={() => setNotificacoesAbertas(!notificacoesAbertas)}
                className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="Notificações"
              >
                <Bell className="w-4 h-4" />
                {naoLidasCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#C86235] rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Popover das Notificações */}
              {notificacoesAbertas && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificacoesAbertas(false)}
                  />
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200/80 shadow-2xl z-50 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">Notificações do Sistema</h4>
                        {naoLidasCount > 0 && (
                          <span className="text-[10px] font-bold bg-[#C86235] text-white px-2 py-0.5 rounded-full">
                            {naoLidasCount} novas
                          </span>
                        )}
                      </div>
                      {naoLidasCount > 0 && (
                        <button
                          onClick={handleMarcarTodasComoLidas}
                          className="text-[11px] font-semibold text-[#C86235] hover:underline cursor-pointer"
                        >
                          Marcar todas como lidas
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                      {notificacoes.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleMarcarComoLida(item.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            item.lida
                              ? 'bg-slate-50/50 border-slate-100 opacity-60'
                              : 'bg-orange-50/30 border-[#C86235]/30 hover:bg-orange-50/60'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="text-xs font-bold text-slate-900">{item.titulo}</h5>
                            <span className="text-[10px] text-slate-400 shrink-0">{item.tempo}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-snug">{item.descricao}</p>
                          {!item.lida && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C86235] mt-2">
                              <Check className="w-3 h-3" /> Clique para marcar como lida
                            </span>
                          )}
                        </div>
                      ))}

                      {notificacoes.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-6">Nenhuma notificação por enquanto.</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Perfil do Usuário */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
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

        <div className="p-6 lg:p-10 flex-1 w-full space-y-8 print:p-0 print:m-0 print:w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
