'use client';

import { Download, TrendingUp, Users, CheckCircle, PieChart, FileText } from 'lucide-react';

export default function RelatoriosPage() {
  const handleExport = (formato: string) => {
    alert(`Exportando relatório sintético em formato ${formato}...`);
  };

  return (
    <div className="w-full space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Relatórios & BI</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Análise consolidada de conversão, receita recorrente e saúde da carteira.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleExport('PDF')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-rose-600" />
            PDF
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 w-full">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Taxa de Conversão</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-0.5">66.7%</div>
          </div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
            2 de 3 negociações ativas convertidas
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 w-full">
          <div className="w-10 h-10 bg-orange-50 text-[#C86235] rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket Médio por Cliente</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-0.5">R$ 3.033,33</div>
          </div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
            Baseado na carteira ativa de contratos
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 w-full">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Retenção de Clientes</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-0.5">100%</div>
          </div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
            Nenhum cancelamento nos últimos 90 dias
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#C86235]" />
              Receita por Categoria
            </h3>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">Honorários Recorrentes</span>
                <span className="text-slate-900 font-bold">R$ 4.300,00 (58.9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-[#C86235] h-full rounded-full" style={{ width: '58.9%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">Projetos Especializados</span>
                <span className="text-slate-900 font-bold">R$ 2.500,00 (34.2%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '34.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">Outros Serviços</span>
                <span className="text-slate-900 font-bold">R$ 500,00 (6.9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '6.9%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Status da Carteira Comercial</h3>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <span className="text-xs font-bold text-emerald-800">Contratos Ativos</span>
              <span className="text-sm font-extrabold text-emerald-900">2 Clientes</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50/60 rounded-xl border border-amber-100">
              <span className="text-xs font-bold text-amber-800">Em Negociação</span>
              <span className="text-sm font-extrabold text-amber-900">1 Cliente</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-xs font-bold text-slate-600">Leads em Qualificação</span>
              <span className="text-sm font-extrabold text-slate-800">4 Oportunidades</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
