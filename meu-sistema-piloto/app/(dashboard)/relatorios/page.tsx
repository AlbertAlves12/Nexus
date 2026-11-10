'use client';

import { Download, TrendingUp, Users, CheckCircle, PieChart, FileText } from 'lucide-react';

export default function RelatoriosPage() {
  const handleExport = (formato: string) => {
    alert(`Exportando relatório sintético em formato ${formato}...`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatórios & Desempenho</h1>
          <p className="text-xs text-slate-500 mt-1">
            Análise consolidada de clientes, receitas e retenção operacional.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleExport('PDF')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-xl transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-rose-600" />
            PDF
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            Excel
          </button>
        </div>
      </div>

      {/* Cartões de Desempenho */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
          <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500">Taxa de Conversão</span>
            <div className="text-3xl font-bold text-slate-900 mt-0.5">66.7%</div>
          </div>
          <p className="text-xs text-slate-400 border-t border-slate-100 pt-3">
            2 de 3 negociações ativas convertidas neste trimestre
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
          <div className="w-9 h-9 bg-orange-50 text-[#C86235] rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500">Ticket Médio por Cliente</span>
            <div className="text-3xl font-bold text-slate-900 mt-0.5">R$ 3.033,33</div>
          </div>
          <p className="text-xs text-slate-400 border-t border-slate-100 pt-3">
            Baseado na carteira ativa de clientes
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
          <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500">Retenção de Clientes</span>
            <div className="text-3xl font-bold text-slate-900 mt-0.5">100%</div>
          </div>
          <p className="text-xs text-slate-400 border-t border-slate-100 pt-3">
            Nenhum cancelamento nos últimos 90 dias
          </p>
        </div>
      </div>

      {/* Gráfico Sintético e Distribuição */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribuição por Categoria */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#C86235]" />
              Receita por Categoria
            </h3>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Honorários Recorrentes</span>
                <span className="text-slate-900 font-bold">R$ 4.300,00 (58.9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#C86235] h-full rounded-full" style={{ width: '58.9%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Projetos Especializados</span>
                <span className="text-slate-900 font-bold">R$ 2.500,00 (34.2%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '34.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Outros Serviços</span>
                <span className="text-slate-900 font-bold">R$ 500,00 (6.9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '6.9%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status da Carteira */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Status da Carteira Comercial</h3>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between p-3 bg-emerald-50/60 rounded-xl">
              <span className="text-xs font-semibold text-emerald-800">Contratos Ativos</span>
              <span className="text-sm font-bold text-emerald-900">2 Clientes</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50/60 rounded-xl">
              <span className="text-xs font-semibold text-amber-800">Em Negociação</span>
              <span className="text-sm font-bold text-amber-900">1 Cliente</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-xs font-semibold text-slate-600">Leads em Qualificação</span>
              <span className="text-sm font-bold text-slate-800">4 Oportunidades</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
