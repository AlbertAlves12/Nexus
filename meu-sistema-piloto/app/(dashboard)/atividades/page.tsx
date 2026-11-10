'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  Kanban,
  List,
  Building2,
  Trash2,
  Layers,
  Send,
  Mail,
  Smartphone,
  X,
  CheckSquare,
  Square,
  BellRing,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface Etapa {
  id: string;
  texto: string;
  concluida: boolean;
}

interface Atividade {
  id: string;
  titulo: string;
  cliente: string;
  nicho: 'fiscal' | 'clinica' | 'geral';
  categoria: string;
  responsavel: string;
  vencimento: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'a_fazer' | 'em_andamento' | 'aguardando' | 'concluido';
  descricao?: string;
  etapas: Etapa[];
  historicoEnvios?: string[];
}

const ATIVIDADES_DEMO: Atividade[] = [
  {
    id: '1',
    titulo: 'Apuração e Emissão da Guia DAS (Simples Nacional)',
    cliente: 'Santos & Associados',
    nicho: 'fiscal',
    categoria: 'Impostos',
    responsavel: 'Albert Santos',
    vencimento: '20/11/2026',
    prioridade: 'Alta',
    status: 'em_andamento',
    descricao: 'Conferência do faturamento mensal acumulado, cálculo da alíquota efetiva do Simples e geração da guia DAS com código de barras.',
    etapas: [
      { id: 'e1', texto: 'Importar Notas Fiscais de Serviço (NFS-e)', concluida: true },
      { id: 'e2', texto: 'Calcular segregação de receitas por anexo', concluida: true },
      { id: 'e3', texto: 'Gerar Guia DAS no Portal do Simples', concluida: false },
      { id: 'e4', texto: 'Disparar documento ao cliente', concluida: false },
    ],
    historicoEnvios: ['Notificação inicial criada no portal em 05/11'],
  },
  {
    id: '2',
    titulo: 'Envio da Declaração SPED Fiscal e Contábil',
    cliente: 'Distribuidora Borborema',
    nicho: 'fiscal',
    categoria: 'Obrigação Acessória',
    responsavel: 'Lucas Gabriel',
    vencimento: '25/11/2026',
    prioridade: 'Alta',
    status: 'a_fazer',
    descricao: 'Validação dos arquivos EFD ICMS/IPI no PVA e transmissão para a Receita Federal.',
    etapas: [
      { id: 'e1', texto: 'Validar inventário de estoque do mês', concluida: false },
      { id: 'e2', texto: 'Auditar inconsistências de CFOP e CST', concluida: false },
      { id: 'e3', texto: 'Transmitir via Receitanet', concluida: false },
    ],
    historicoEnvios: [],
  },
  {
    id: '3',
    titulo: 'Registro de Prontuário Eletrônico & Anamnese',
    cliente: 'Paciente: Dr. Roberto / Dra. Clara',
    nicho: 'clinica',
    categoria: 'Atendimento Clínico',
    responsavel: 'Dra. Camila',
    vencimento: 'Hoje',
    prioridade: 'Alta',
    status: 'em_andamento',
    descricao: 'Registro das observações clínicas da consulta, prescrição de medicamentos e solicitação de exames de imagem.',
    etapas: [
      { id: 'e1', texto: 'Preencher anamnese inicial', concluida: true },
      { id: 'e2', texto: 'Emitir receita médica digital assinada', concluida: false },
      { id: 'e3', texto: 'Agendar retorno no sistema', concluida: false },
    ],
    historicoEnvios: ['Confirmação enviada via WhatsApp às 08:30'],
  },
  {
    id: '4',
    titulo: 'Vistoria Técnica e Validação do Projeto',
    cliente: 'Engenharia & Obras LTDA',
    nicho: 'geral',
    categoria: 'Operacional',
    responsavel: 'Carlos Eduardo',
    vencimento: '18/11/2026',
    prioridade: 'Média',
    status: 'aguardando',
    descricao: 'Inspeção presencial no local de execução da obra para validação das etapas estruturais antes da medição final.',
    etapas: [
      { id: 'e1', texto: 'Vistoria de campo e registro fotográfico', concluida: true },
      { id: 'e2', texto: 'Elaboração do Laudo de Conformidade', concluida: true },
      { id: 'e3', texto: 'Aprovação da diretoria do cliente', concluida: false },
    ],
    historicoEnvios: ['Relatório prévio enviado por e-mail em 10/11'],
  },
];

export default function AtividadesPage() {
  const [atividades, setAtividades] = useState<Atividade[]>(ATIVIDADES_DEMO);
  const [carregado, setCarregado] = useState(false);
  const [nichoFiltro, setNichoFiltro] = useState<'fiscal' | 'clinica' | 'geral'>('fiscal');
  const [visao, setVisao] = useState<'kanban' | 'lista'>('kanban');

  // Modais State
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [atividadeDetalhes, setAtividadeDetalhes] = useState<Atividade | null>(null);

  // New Activity Form State
  const [titulo, setTitulo] = useState('');
  const [cliente, setCliente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [novaEtapaTexto, setNovaEtapaTexto] = useState('');

  // Carregar do localStorage
  useEffect(() => {
    const salvos = localStorage.getItem('piloto_atividades_v2');
    if (salvos) {
      try {
        setAtividades(JSON.parse(salvos));
      } catch (e) {
        console.error('Erro ao carregar atividades', e);
      }
    }
    setCarregado(true);
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    if (carregado) {
      localStorage.setItem('piloto_atividades_v2', JSON.stringify(atividades));
    }
  }, [atividades, carregado]);

  const atividadesFiltradas = atividades.filter((a) => a.nicho === nichoFiltro);

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !cliente) return;

    const nova: Atividade = {
      id: String(Date.now()),
      titulo,
      cliente,
      nicho: nichoFiltro,
      categoria: categoria || (nichoFiltro === 'fiscal' ? 'Fiscal' : nichoFiltro === 'clinica' ? 'Consulta' : 'Geral'),
      responsavel: responsavel || 'Albert Santos',
      vencimento: vencimento || 'A definir',
      prioridade: 'Média',
      status: 'a_fazer',
      descricao: descricao || 'Sem descrição adicional fornecida.',
      etapas: [
        { id: '1', texto: 'Iniciar processo', concluida: false },
        { id: '2', texto: 'Revisão e envio', concluida: false },
      ],
      historicoEnvios: [],
    };

    setAtividades([nova, ...atividades]);
    setTitulo('');
    setCliente('');
    setCategoria('');
    setResponsavel('');
    setVencimento('');
    setDescricao('');
    setModalNovoAberto(false);
  };

  const handleMudarStatus = (id: string, novoStatus: Atividade['status']) => {
    const atualizadas = atividades.map((a) => (a.id === id ? { ...a, status: novoStatus } : a));
    setAtividades(atualizadas);
    if (atividadeDetalhes && atividadeDetalhes.id === id) {
      setAtividadeDetalhes({ ...atividadeDetalhes, status: novoStatus });
    }
  };

  const handleToggleEtapa = (atividadeId: string, etapaId: string) => {
    const atualizadas = atividades.map((act) => {
      if (act.id !== atividadeId) return act;
      const novasEtapas = act.etapas.map((et) =>
        et.id === etapaId ? { ...et, concluida: !et.concluida } : et
      );
      return { ...act, etapas: novasEtapas };
    });

    setAtividades(atualizadas);

    if (atividadeDetalhes && atividadeDetalhes.id === atividadeId) {
      const novasEtapas = atividadeDetalhes.etapas.map((et) =>
        et.id === etapaId ? { ...et, concluida: !et.concluida } : et
      );
      setAtividadeDetalhes({ ...atividadeDetalhes, etapas: novasEtapas });
    }
  };

  const handleAdicionarEtapa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaEtapaTexto.trim() || !atividadeDetalhes) return;

    const novaEtapa: Etapa = {
      id: String(Date.now()),
      texto: novaEtapaTexto,
      concluida: false,
    };

    const novasEtapas = [...atividadeDetalhes.etapas, novaEtapa];
    const atividadeAtualizada = { ...atividadeDetalhes, etapas: novasEtapas };

    setAtividadeDetalhes(atividadeAtualizada);
    setAtividades(atividades.map((a) => (a.id === atividadeDetalhes.id ? atividadeAtualizada : a)));
    setNovaEtapaTexto('');
  };

  const handleDispararNotificacao = (canal: 'WhatsApp' | 'E-mail' | 'App do Cliente') => {
    if (!atividadeDetalhes) return;
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const registro = `Notificação enviada via ${canal} para ${atividadeDetalhes.cliente} às ${hora}`;

    const historico = [...(atividadeDetalhes.historicoEnvios || []), registro];
    const atividadeAtualizada = { ...atividadeDetalhes, historicoEnvios: historico };

    setAtividadeDetalhes(atividadeAtualizada);
    setAtividades(atividades.map((a) => (a.id === atividadeDetalhes.id ? atividadeAtualizada : a)));

    alert(`🚀 Notificação disparada com sucesso via ${canal}!`);
  };

  const handleExcluir = (id: string) => {
    if (confirm('Deseja remover esta atividade?')) {
      setAtividades(atividades.filter((a) => a.id !== id));
      if (atividadeDetalhes?.id === id) setAtividadeDetalhes(null);
    }
  };

  const getColunasStatus = () => [
    { key: 'a_fazer', label: 'A Fazer', color: 'bg-slate-100 text-slate-700 border-slate-200' },
    { key: 'em_andamento', label: 'Em Andamento', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { key: 'aguardando', label: 'Aguardando Cliente/Aprovação', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { key: 'concluido', label: 'Concluído', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Cabeçalho Superior */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/60 pb-6 w-full">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#C86235] bg-[#C86235]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Módulo Operacional & Disparos Multicanais
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gestão de Atividades & Processos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Controle de etapas operacionais, prazos de entrega e integração direta com WhatsApp, E-mail e App.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Seletor de Modelo de Nicho */}
          <div className="flex bg-slate-200/70 p-1 rounded-xl">
            <button
              onClick={() => setNichoFiltro('fiscal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                nichoFiltro === 'fiscal' ? 'bg-[#1E2330] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fiscal / Contábil
            </button>
            <button
              onClick={() => setNichoFiltro('clinica')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                nichoFiltro === 'clinica' ? 'bg-[#1E2330] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Clínica / Saúde
            </button>
            <button
              onClick={() => setNichoFiltro('geral')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                nichoFiltro === 'geral' ? 'bg-[#1E2330] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Serviços / Geral
            </button>
          </div>

          <button
            onClick={() => setModalNovoAberto(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C86235] hover:bg-[#b0532b] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm shadow-[#C86235]/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nova Atividade
          </button>
        </div>
      </div>

      {/* Barra de Filtro de Visão (Kanban vs Lista) */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm w-full">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-2 pl-2">
            <Layers className="w-4 h-4 text-[#C86235]" />
            Modelo Atual:
            <span className="text-[#C86235] uppercase">
              {nichoFiltro === 'fiscal' ? 'Escritório Fiscal & Contábil' : nichoFiltro === 'clinica' ? 'Clínica & Saúde' : 'Prestação de Serviços'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setVisao('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              visao === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            Kanban
          </button>
          <button
            onClick={() => setVisao('lista')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              visao === 'lista' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Lista
          </button>
        </div>
      </div>

      {/* VISÃO KANBAN */}
      {visao === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-start">
          {getColunasStatus().map((coluna) => {
            const atividadesDaColuna = atividadesFiltradas.filter((a) => a.status === coluna.key);
            return (
              <div
                key={coluna.key}
                className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3 min-h-[520px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${coluna.color}`}>
                    {coluna.label}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{atividadesDaColuna.length}</span>
                </div>

                <div className="space-y-3 flex-1">
                  {atividadesDaColuna.map((item) => {
                    const concluidas = item.etapas.filter((e) => e.concluida).length;
                    const totalEtapas = item.etapas.length;
                    const pct = totalEtapas > 0 ? Math.round((concluidas / totalEtapas) * 100) : 0;

                    return (
                      <div
                        key={item.id}
                        onClick={() => setAtividadeDetalhes(item)}
                        className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#C86235]/50 transition-all cursor-pointer space-y-3 group"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            {item.categoria}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExcluir(item.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#C86235] transition-colors">
                          {item.titulo}
                        </h4>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{item.cliente}</span>
                        </div>

                        {/* Barra de Progresso de Subtarefas */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                            <span>Etapas ({concluidas}/{totalEtapas})</span>
                            <span>{pct}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#C86235] h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-400" />
                            {item.responsavel}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-slate-600">
                            <Calendar className="w-3 h-3 text-[#C86235]" />
                            {item.vencimento}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {atividadesDaColuna.length === 0 && (
                    <div className="py-10 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                      Nenhuma atividade nesta etapa
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VISÃO LISTA */}
      {visao === 'lista' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Atividade / Processo</th>
                  <th className="px-6 py-4">Cliente / Vínculo</th>
                  <th className="px-6 py-4">Etapas Concluídas</th>
                  <th className="px-6 py-4">Responsável</th>
                  <th className="px-6 py-4">Vencimento</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {atividadesFiltradas.map((item) => {
                  const concluidas = item.etapas.filter((e) => e.concluida).length;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => setAtividadeDetalhes(item)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-bold text-slate-900">{item.titulo}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{item.cliente}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                        {concluidas} de {item.etapas.length} etapas
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{item.responsavel}</td>
                      <td className="px-6 py-4 text-xs font-bold text-[#C86235]">{item.vencimento}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                          {item.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExcluir(item.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL DE DETALHES DO PROCESSO & DISPAROS MULTICANAIS */}
      {atividadeDetalhes && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 relative border border-slate-100">
            {/* Header do Modal */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#C86235] uppercase tracking-wider">
                  Detalhamento da Operação • {atividadeDetalhes.categoria}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{atividadeDetalhes.titulo}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Cliente: <strong className="text-slate-800">{atividadeDetalhes.cliente}</strong></p>
              </div>
              <button
                onClick={() => setAtividadeDetalhes(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status e Metadados do Processo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Status Atual</span>
                <select
                  value={atividadeDetalhes.status}
                  onChange={(e) => handleMudarStatus(atividadeDetalhes.id, e.target.value as Atividade['status'])}
                  className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="a_fazer">A Fazer</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="aguardando">Aguardando Cliente</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Responsável</span>
                <p className="text-xs font-bold text-slate-800 mt-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {atividadeDetalhes.responsavel}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Previsão / Vencimento</span>
                <p className="text-xs font-bold text-[#C86235] mt-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {atividadeDetalhes.vencimento}
                </p>
              </div>
            </div>

            {/* Descrição do Processo */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-1">Descrição do Processo</h4>
              <p className="text-xs text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                {atividadeDetalhes.descricao || 'Sem observações cadastradas.'}
              </p>
            </div>

            {/* Checklist de Etapas Operacionais */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Etapas & Subtarefas Operacionais</h4>
              <div className="space-y-2">
                {atividadeDetalhes.etapas.map((etapa) => (
                  <div
                    key={etapa.id}
                    onClick={() => handleToggleEtapa(atividadeDetalhes.id, etapa.id)}
                    className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 cursor-pointer transition-colors"
                  >
                    {etapa.concluida ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className={`text-xs font-medium flex-1 ${etapa.concluida ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {etapa.texto}
                    </span>
                  </div>
                ))}
              </div>

              {/* Adicionar Nova Subtarefa */}
              <form onSubmit={handleAdicionarEtapa} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={novaEtapaTexto}
                  onChange={(e) => setNovaEtapaTexto(e.target.value)}
                  placeholder="Adicionar nova etapa a este processo..."
                  className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#C86235]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Adicionar Etapa
                </button>
              </form>
            </div>

            {/* Central de Disparos e Notificações ao Cliente */}
            <div className="bg-[#1E2330] p-5 rounded-2xl text-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-[#C86235]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Enviar Atualização ao Cliente</h4>
                </div>
                <span className="text-[10px] text-slate-400">White-Label Dispatches</span>
              </div>

              <p className="text-xs text-slate-300">
                Dispare notificações em tempo real com o status atualizado deste processo para os canais do cliente:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => handleDispararNotificacao('WhatsApp')}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  WhatsApp API
                </button>
                <button
                  onClick={() => handleDispararNotificacao('E-mail')}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  E-mail Oficial
                </button>
                <button
                  onClick={() => handleDispararNotificacao('App do Cliente')}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#C86235] hover:bg-[#b0532b] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  App do Cliente
                </button>
              </div>

              {/* Histórico de Envios */}
              {atividadeDetalhes.historicoEnvios && atividadeDetalhes.historicoEnvios.length > 0 && (
                <div className="pt-3 border-t border-slate-700/60 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Histórico de Disparos:</span>
                  {atividadeDetalhes.historicoEnvios.map((h, i) => (
                    <p key={i} className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      {h}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CADASTRAR NOVA ATIVIDADE */}
      {modalNovoAberto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Cadastrar Nova Atividade</h3>
            <form onSubmit={handleCadastrar} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Título da Atividade / Processo</label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Ex: Emissão DAS ou Consulta Médica"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Cliente / Vínculo</label>
                <input
                  type="text"
                  required
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Nome do cliente ou empresa"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Descrição Detalhada</label>
                <textarea
                  rows={2}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Detalhes operacionais sobre este procedimento..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Categoria</label>
                  <input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                    placeholder="Impostos, Exames..."
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Vencimento</label>
                  <input
                    type="text"
                    value={vencimento}
                    onChange={(e) => setVencimento(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                    placeholder="20/11/2026 ou Hoje"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Responsável</label>
                <input
                  type="text"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Nome do operador"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalNovoAberto(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C86235] text-white text-sm font-semibold rounded-lg hover:bg-[#b0532b]"
                >
                  Salvar Atividade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
