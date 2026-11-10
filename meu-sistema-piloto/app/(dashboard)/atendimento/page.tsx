'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, PhoneCall, Send, Smartphone, QrCode, FileText, ChevronRight } from 'lucide-react';

interface Ticket {
  id: string;
  cliente: string;
  empresa: string;
  canal: 'WhatsApp' | 'Portal Cliente';
  servico: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'Aberto' | 'Em Andamento' | 'Concluído';
  ultimaMensagem: string;
  hora: string;
}

const TICKETS_DEMO: Ticket[] = [
  {
    id: 'TK-104',
    cliente: 'Carlos Eduardo',
    empresa: 'Santos & Associados',
    canal: 'WhatsApp',
    servico: 'Solicitação de Relatório Fiscal',
    prioridade: 'Alta',
    status: 'Em Andamento',
    ultimaMensagem: 'Preciso do relatório de fechamento até o fim do dia.',
    hora: '10:42',
  },
  {
    id: 'TK-103',
    cliente: 'Mariana Oliveira',
    empresa: 'TechInovação Soluções',
    canal: 'Portal Cliente',
    servico: 'Pedido de Segunda Via de Fatura',
    prioridade: 'Média',
    status: 'Aberto',
    ultimaMensagem: 'Poderiam reemitir a fatura com vencimento para o dia 15?',
    hora: '09:15',
  },
  {
    id: 'TK-102',
    cliente: 'Roberto Fonseca',
    empresa: 'Distribuidora Borborema',
    canal: 'WhatsApp',
    servico: 'Alteração Cadastral',
    prioridade: 'Baixa',
    status: 'Concluído',
    ultimaMensagem: 'Obrigado pelo envio dos documentos atualizados!',
    hora: 'Ontem',
  },
];

const MENSAGENS_INICIAIS = [
  { remetente: 'cliente', texto: 'Olá, bom dia! Preciso do relatório de fechamento fiscal.', hora: '10:35' },
  { remetente: 'sistema', texto: 'Atendimento iniciado por Albert Santos via WhatsApp.', hora: '10:38' },
  { remetente: 'cliente', texto: 'Preciso do relatório de fechamento até o fim do dia.', hora: '10:42' },
];

export default function AtendimentoPage() {
  const [tickets] = useState<Ticket[]>(TICKETS_DEMO);
  const [ticketSelecionado, setTicketSelecionado] = useState<Ticket>(TICKETS_DEMO[0]);
  const [abaAtiva, setAbaAtiva] = useState<'chamados' | 'whatsapp' | 'portal'>('chamados');
  const [mensagem, setMensagem] = useState('');
  const [historicoMensagens, setHistoricoMensagens] = useState(MENSAGENS_INICIAIS);
  const [carregado, setCarregado] = useState(false);

  // Carregar histórico do localStorage
  useEffect(() => {
    const salvos = localStorage.getItem('piloto_atendimento_msg');
    if (salvos) {
      try {
        setHistoricoMensagens(JSON.parse(salvos));
      } catch (e) {
        console.error('Erro ao carregar mensagens', e);
      }
    }
    setCarregado(true);
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    if (carregado) {
      localStorage.setItem('piloto_atendimento_msg', JSON.stringify(historicoMensagens));
    }
  }, [historicoMensagens, carregado]);

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagem = {
      remetente: 'atendente',
      texto: mensagem,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setHistoricoMensagens([...historicoMensagens, novaMensagem]);
    setMensagem('');
  };

  return (
    <div className="w-full space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Central de Atendimento</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestão unificada de chamados via WhatsApp e Portal do Cliente.
          </p>
        </div>

        <div className="flex gap-1 bg-slate-200/60 p-1 rounded-xl">
          <button
            onClick={() => setAbaAtiva('chamados')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              abaAtiva === 'chamados' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fila de Chamados
          </button>
          <button
            onClick={() => setAbaAtiva('whatsapp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              abaAtiva === 'whatsapp' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Conexão WhatsApp
          </button>
          <button
            onClick={() => setAbaAtiva('portal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              abaAtiva === 'portal' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Portal do Cliente (App)
          </button>
        </div>
      </div>

      {abaAtiva === 'chamados' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-[650px] w-full">
          <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col w-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Chamados Ativos</span>
              <span className="text-xs bg-[#C86235]/10 text-[#C86235] px-2 py-0.5 rounded-full font-semibold">
                {tickets.length} chamados
              </span>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setTicketSelecionado(ticket)}
                  className={`p-4 cursor-pointer transition-colors ${
                    ticketSelecionado.id === ticket.id ? 'bg-slate-50 border-l-4 border-[#C86235]' : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-800">{ticket.cliente}</span>
                    <span className="text-[10px] text-slate-400">{ticket.hora}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{ticket.empresa}</p>
                  <p className="text-xs text-slate-600 truncate mt-2">{ticket.ultimaMensagem}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                      ticket.canal === 'WhatsApp' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {ticket.canal}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                      ticket.status === 'Em Andamento' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 xl:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col overflow-hidden w-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{ticketSelecionado.cliente}</h3>
                <p className="text-xs text-slate-500">{ticketSelecionado.empresa} • {ticketSelecionado.servico}</p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">
                {ticketSelecionado.canal} Conectado
              </span>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-[#FAF8F5]/50">
              {historicoMensagens.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.remetente === 'atendente' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-xl px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      msg.remetente === 'atendente'
                        ? 'bg-[#1E2330] text-white rounded-br-none'
                        : msg.remetente === 'sistema'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200/50 self-center'
                        : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm rounded-bl-none'
                    }`}
                  >
                    {msg.texto}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.hora}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleEnviarMensagem} className="p-4 border-t border-slate-100 bg-white flex gap-3">
              <input
                type="text"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite a resposta para o cliente..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C86235] hover:bg-[#b0532b] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}

      {abaAtiva === 'whatsapp' && (
        <div className="bg-white p-10 rounded-2xl border border-slate-200/80 shadow-sm w-full space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <Smartphone className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Integração WhatsApp Business API</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
              Conecte o número da empresa para automação de mensagens, envio de faturas e atendimento centralizado.
            </p>
          </div>

          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 inline-block space-y-4">
            <QrCode className="w-40 h-40 text-slate-800 mx-auto" />
            <p className="text-xs font-bold text-slate-700">Escaneie o QR Code para parear o número</p>
            <span className="inline-block text-xs text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-semibold">
              Servidor Pronto para Conexão
            </span>
          </div>
        </div>
      )}

      {abaAtiva === 'portal' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm w-full space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Portal do Cliente (Visão do App)</h3>
              <p className="text-xs text-slate-500">Interface onde os clientes finais solicitam serviços e acompanham pedidos.</p>
            </div>
            <span className="text-xs bg-[#C86235]/10 text-[#C86235] px-3 py-1 rounded-full font-bold">
              White-Label Habilitado
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <FileText className="w-6 h-6 text-[#C86235]" />
              <h4 className="text-sm font-bold text-slate-800">Solicitação de Documentos</h4>
              <p className="text-xs text-slate-500">Emissão de certidões, contratos e guias fiscais em tempo real.</p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <PhoneCall className="w-6 h-6 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-800">Suporte Prioritário</h4>
              <p className="text-xs text-slate-500">Abertura de chamados com notificação direta no WhatsApp do atendente.</p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <ChevronRight className="w-6 h-6 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-800">Status em Tempo Real</h4>
              <p className="text-xs text-slate-500">Acompanhamento transparente das etapas de cada solicitação.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
