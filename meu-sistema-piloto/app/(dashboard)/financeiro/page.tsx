'use client';

import { useState, useEffect } from 'react';
import { Plus, ArrowUpRight, ArrowDownRight, DollarSign, Wallet, Filter, CheckCircle2, Clock, Trash2 } from 'lucide-react';

interface Transacao {
  id: string;
  descricao: string;
  categoria: string;
  valor: string;
  tipo: 'receita' | 'despesa';
  data: string;
  status: 'Pago' | 'Pendente';
}

const TRANSACOES_INICIAIS: Transacao[] = [
  {
    id: '1',
    descricao: 'Mensalidade - Santos & Associados',
    categoria: 'Honorários',
    valor: 'R$ 2.500,00',
    tipo: 'receita',
    data: '05/11/2026',
    status: 'Pago',
  },
  {
    id: '2',
    descricao: 'Assinatura Servidores Cloud',
    categoria: 'Infraestrutura',
    valor: 'R$ 450,00',
    tipo: 'despesa',
    data: '02/11/2026',
    status: 'Pago',
  },
  {
    id: '3',
    descricao: 'Contrato Consultoria - TechInovação',
    categoria: 'Projetos Especializados',
    valor: 'R$ 4.800,00',
    tipo: 'receita',
    data: '10/11/2026',
    status: 'Pendente',
  },
  {
    id: '4',
    descricao: 'Licenças de Software',
    categoria: 'Ferramentas',
    valor: 'R$ 320,00',
    tipo: 'despesa',
    data: '12/11/2026',
    status: 'Pendente',
  },
];

export default function FinanceiroPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>(TRANSACOES_INICIAIS);
  const [carregado, setCarregado] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'receita' | 'despesa'>('todos');
  const [modalAberto, setModalAberto] = useState(false);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('receita');
  const [categoria, setCategoria] = useState('');

  // Carregar dados do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('piloto_financeiro');
    if (dadosSalvos) {
      try {
        setTransacoes(JSON.parse(dadosSalvos));
      } catch (e) {
        console.error('Erro ao carregar transações', e);
      }
    }
    setCarregado(true);
  }, []);

  // Salvar alterações no localStorage
  useEffect(() => {
    if (carregado) {
      localStorage.setItem('piloto_financeiro', JSON.stringify(transacoes));
    }
  }, [transacoes, carregado]);

  const transacoesFiltradas = transacoes.filter((t) => {
    if (filtroTipo === 'todos') return true;
    return t.tipo === filtroTipo;
  });

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao || !valor) return;

    const nova: Transacao = {
      id: String(Date.now()),
      descricao,
      categoria: categoria || 'Geral',
      valor: `R$ ${valor}`,
      tipo,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente',
    };

    setTransacoes([nova, ...transacoes]);
    setDescricao('');
    setValor('');
    setCategoria('');
    setModalAberto(false);
  };

  const handleExcluir = (id: string) => {
    if (confirm('Deseja excluir este lançamento?')) {
      setTransacoes(transacoes.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="w-full space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Gestão Financeira</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Controle de fluxo de caixa, faturamento recorrente e lançamentos.
          </p>
        </div>

        <button
          onClick={() => setModalAberto(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C86235] hover:bg-[#b0532b] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm shadow-[#C86235]/30 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Novo Lançamento
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 w-full">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Receita Mensal</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">R$ 7.300,00</div>
          <p className="text-xs text-emerald-600 font-semibold pt-2 border-t border-slate-100">+15% em relação ao mês anterior</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 w-full">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Despesas</span>
            <ArrowDownRight className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">R$ 770,00</div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">Despesas operacionais</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 w-full">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Saldo Líquido</span>
            <Wallet className="w-4 h-4 text-[#C86235]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">R$ 6.530,00</div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">Resultado do exercício</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 w-full">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>A Receber</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">R$ 4.800,00</div>
          <p className="text-xs text-amber-600 font-semibold pt-2 border-t border-slate-100">1 contrato pendente</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden w-full">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Filtrar por:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setFiltroTipo('todos')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filtroTipo === 'todos' ? 'bg-[#1E2330] text-white' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFiltroTipo('receita')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filtroTipo === 'receita' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Receitas
              </button>
              <button
                onClick={() => setFiltroTipo('despesa')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filtroTipo === 'despesa' ? 'bg-rose-700 text-white' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                Despesas
              </button>
            </div>
          </div>
          <span className="text-xs text-slate-400">{transacoesFiltradas.length} lançamentos</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Valor</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transacoesFiltradas.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{t.descricao}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{t.categoria}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{t.data}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        t.status === 'Pago' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {t.status === 'Pago' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {t.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-bold ${
                      t.tipo === 'receita' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {t.tipo === 'receita' ? `+ ${t.valor}` : `- ${t.valor}`}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleExcluir(t.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Excluir lançamento"
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

      {modalAberto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Novo Lançamento Financeiro</h3>
            <form onSubmit={handleCadastrar} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Descrição</label>
                <input
                  type="text"
                  required
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Ex: Mensalidade de cliente"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Tipo</label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as 'receita' | 'despesa')}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm bg-white"
                  >
                    <option value="receita">Receita (+)</option>
                    <option value="despesa">Despesa (-)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Valor (R$)</label>
                  <input
                    type="text"
                    required
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                    placeholder="1.500,00"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Categoria</label>
                <input
                  type="text"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Ex: Honorários, Software, Infraestrutura"
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
                  Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
