'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Calendar,
  User,
  Tag,
  CheckCircle2,
  Clock,
  AlertCircle,
  Kanban,
  List,
  Building2,
  Trash2,
  Layers,
  Sparkles,
} from 'lucide-react';

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
}

const ATIVIDADES_DEMO: Atividade[] = [
  // Nicho Fiscal / Contábil
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
  },
  {
    id: '3',
    titulo: 'Fechamento da Folha de Pagamento & eSocial',
    cliente: 'TechInovação Soluções',
    nicho: 'fiscal',
    categoria: 'Departamento Pessoal',
    responsavel: 'Mariana Silva',
    vencimento: '05/12/2026',
    prioridade: 'Média',
    status: 'concluido',
  },

  // Nicho Clínica / Saúde
  {
    id: '4',
    titulo: 'Registro de Prontuário Eletrônico & Anamnese',
    cliente: 'Paciente: Dr. Roberto / Dra. Clara',
    nicho: 'clinica',
    categoria: 'Atendimento Clínico',
    responsavel: 'Dra. Camila',
    vencimento: 'Hoje',
    prioridade: 'Alta',
    status: 'em_andamento',
  },
  {
    id: '5',
    titulo: 'Confirmação de Consultas e Exames via WhatsApp',
    cliente: 'Agenda do Dia (14 pacientes)',
    nicho: 'clinica',
    categoria: 'Recepção / Agenda',
    responsavel: 'Atendimento',
    vencimento: 'Hoje',
    prioridade: 'Média',
    status: 'concluido',
  },

  // Nicho Geral / Serviços
  {
    id: '6',
    titulo: 'Vistoria Técnica e Validação do Projeto',
    cliente: 'Engenharia & Obras LTDA',
    nicho: 'geral',
    categoria: 'Operacional',
    responsavel: 'Carlos Eduardo',
    vencimento: '18/11/2026',
    prioridade: 'Média',
    status: 'aguardando',
  },
];

export default function AtividadesPage() {
  const [atividades, setAtividades] = useState<Atividade[]>(ATIVIDADES_DEMO);
  const [carregado, setCarregado] = useState(false);
  const [nichoFiltro, setNichoFiltro] = useState<'fiscal' | 'clinica' | 'geral'>('fiscal');
  const [visao, setVisao] = useState<'kanban' | 'lista'>('kanban');
  const [modalAberto, setModalAberto] = useState(false);

  // Form State
  const [titulo, setTitulo] = useState('');
  const [cliente, setCliente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [prioridade, setPrioridade] = useState<'Alta' | 'Média' | 'Baixa'>('Média');

  // Carregar do localStorage
  useEffect(() => {
    const salvos = localStorage.getItem('piloto_atividades');
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
      localStorage.setItem('piloto_atividades', JSON.stringify(atividades));
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
      prioridade,
      status: 'a_fazer',
    };

    setAtividades([nova, ...atividades]);
    setTitulo('');
    setCliente('');
    setCategoria('');
    setResponsavel('');
    setVencimento('');
    setModalAberto(false);
  };

  const handleMudarStatus = (id: string, novoStatus: Atividade['status']) => {
    setAtividades(
      atividades.map((a) => (a.id === id ? { ...a, status: novoStatus } : a))
    );
  };

  const handleExcluir = (id: string) => {
    if (confirm('Deseja remover esta atividade?')) {
      setAtividades(atividades.filter((a) => a.id !== id));
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
      {/* Cabeçalho */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/60 pb-6 w-full">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#C86235] bg-[#C86235]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Módulo Operacional Adaptável
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gestão de Atividades & Rotinas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pipeline operacional configurável para escritórios fiscais, clínicas ou empresas de serviços.
          </p>
        </div>

        {/* Botão Novo + Seletor de Modelo */}
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
            onClick={() => setModalAberto(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C86235] hover:bg-[#b0532b] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm shadow-[#C86235]/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nova Atividade
          </button>
        </div>
      </div>

      {/* Barra de Filtro de Visão (Kanban vs Lista) */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm w-full">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 pl-2">
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
                className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200/60 flex flex-col gap-3 min-h-[500px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${coluna.color}`}>
                    {coluna.label}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{atividadesDaColuna.length}</span>
                </div>

                <div className="space-y-3 flex-1">
                  {atividadesDaColuna.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3 group"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                          {item.categoria}
                        </span>
                        <button
                          onClick={() => handleExcluir(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.titulo}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.cliente}</span>
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

                      {/* Seletor Rápido de Status */}
                      <div className="pt-2">
                        <select
                          value={item.status}
                          onChange={(e) => handleMudarStatus(item.id, e.target.value as Atividade['status'])}
                          className="w-full text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded-lg p-1 text-slate-600 focus:outline-none"
                        >
                          <option value="a_fazer">Mover para: A Fazer</option>
                          <option value="em_andamento">Mover para: Em Andamento</option>
                          <option value="aguardando">Mover para: Aguardando</option>
                          <option value="concluido">Mover para: Concluído</option>
                        </select>
                      </div>
                    </div>
                  ))}

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
                  <th className="px-6 py-4">Cliente / Vinculo</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4">Responsável</th>
                  <th className="px-6 py-4">Vencimento</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {atividadesFiltradas.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{item.titulo}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{item.cliente}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{item.categoria}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{item.responsavel}</td>
                    <td className="px-6 py-4 text-xs font-bold text-[#C86235]">{item.vencimento}</td>
                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleMudarStatus(item.id, e.target.value as Atividade['status'])}
                        className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-1 text-slate-700"
                      >
                        <option value="a_fazer">A Fazer</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="aguardando">Aguardando</option>
                        <option value="concluido">Concluído</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleExcluir(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de Nova Atividade */}
      {modalAberto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Cadastrar Nova Atividade</h3>
            <form onSubmit={handleCadastrar} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Título do Processo / Tarefa</label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder={
                    nichoFiltro === 'fiscal'
                      ? 'Ex: Apuração DAS / Fechamento Fiscal'
                      : nichoFiltro === 'clinica'
                      ? 'Ex: Emissão de Exame / Prontuário'
                      : 'Ex: Vistoria Técnica / Orçamento'
                  }
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
                  placeholder="Nome do cliente ou paciente"
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
                    placeholder="Ex: Impostos, Anamnese"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Vencimento</label>
                  <input
                    type="text"
                    value={vencimento}
                    onChange={(e) => setVencimento(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                    placeholder="25/11/2026 ou Hoje"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Responsável Interno</label>
                <input
                  type="text"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Nome do operador ou médico"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
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
