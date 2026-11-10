'use client';

import { Download, TrendingUp, Users, CheckCircle, PieChart, FileText } from 'lucide-react';

export default function RelatoriosPage() {
  // Exportar para Excel (.csv formatado para o Microsoft Excel)
  const handleExportExcel = () => {
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const relatorioData = [
      ['SISTEMA PILOTO - RELATÓRIO DE DESEMPENHO E BI'],
      ['Empresa', 'Albert Tech'],
      ['Data da Emissão', dataAtual],
      ['Plano', 'Enterprise White-Label (24 Meses)'],
      [''],
      ['INDICADORES PRINCIPAIS (KPIs)'],
      ['Indicador', 'Valor', 'Detalhamento'],
      ['Taxa de Conversão', '66.7%', '2 de 3 negociações ativas convertidas'],
      ['Ticket Médio por Cliente', 'R$ 3.033,33', 'Baseado na carteira ativa de contratos'],
      ['Retenção de Clientes', '100%', 'Nenhum cancelamento nos últimos 90 dias'],
      [''],
      ['RECEITA POR CATEGORIA'],
      ['Categoria', 'Valor (R$)', 'Percentual (%)'],
      ['Honorários Recorrentes', '4.300,00', '58.9%'],
      ['Projetos Especializados', '2.500,00', '34.2%'],
      ['Outros Serviços', '500,00', '6.9%'],
      ['TOTAL DE RECEITA', '7.300,00', '100.0%'],
      [''],
      ['STATUS DA CARTEIRA COMERCIAL'],
      ['Status', 'Quantidade'],
      ['Contratos Ativos', '2 Clientes'],
      ['Em Negociação', '1 Cliente'],
      ['Leads em Qualificação', '4 Oportunidades'],
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      relatorioData.map((linha) => linha.map((campo) => `"${campo}"`).join(';')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Relatorio_BI_AlbertTech_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Disparar Impressão / Salvar PDF
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6 font-sans print:space-y-4 print:p-0 print:m-0">
      {/* Cabeçalho do Relatório */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6 w-full print:border-b-2 print:border-slate-800 print:pb-3">
        <div>
          <div className="hidden print:flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-[#C86235] text-white font-bold rounded-lg flex items-center justify-center text-sm">
              p.
            </div>
            <span className="font-bold text-slate-900 text-lg">sistema piloto</span>
            <span className="text-xs text-slate-500 font-medium">| Relatório Executivo BI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight print:text-xl">
            Relatórios & BI
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 print:text-[11px] print:text-slate-600">
            Análise consolidada de conversão, receita recorrente e saúde da carteira • Albert Tech
          </p>
        </div>

        {/* Botões de Ação (Escondidos no PDF) */}
        <div className="flex gap-2 print:hidden">
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-rose-600" />
            PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            Excel
          </button>
        </div>
      </div>

      {/* Grid de KPIs principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full print:grid-cols-3 print:gap-3">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 w-full print:p-4 print:rounded-xl print:border-slate-300 print:shadow-none print:break-inside-avoid">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center print:hidden">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider print:text-[10px]">
              Taxa de Conversão
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-0.5 print:text-xl">66.7%</div>
          </div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100 print:text-[10px] print:pt-1">
            2 de 3 negociações ativas convertidas
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 w-full print:p-4 print:rounded-xl print:border-slate-300 print:shadow-none print:break-inside-avoid">
          <div className="w-10 h-10 bg-orange-50 text-[#C86235] rounded-xl flex items-center justify-center print:hidden">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider print:text-[10px]">
              Ticket Médio por Cliente
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-0.5 print:text-xl">R$ 3.033,33</div>
          </div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100 print:text-[10px] print:pt-1">
            Baseado na carteira ativa de contratos
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 w-full print:p-4 print:rounded-xl print:border-slate-300 print:shadow-none print:break-inside-avoid">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center print:hidden">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider print:text-[10px]">
              Retenção de Clientes
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-0.5 print:text-xl">100%</div>
          </div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100 print:text-[10px] print:pt-1">
            Nenhum cancelamento nos últimos 90 dias
          </p>
        </div>
      </div>

      {/* Gráficos e Status da Carteira */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full print:grid-cols-2 print:gap-4">
        {/* Distribuição por Categoria */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 w-full print:p-4 print:rounded-xl print:border-slate-300 print:shadow-none print:break-inside-avoid">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 print:pb-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 print:text-sm">
              <PieChart className="w-4 h-4 text-[#C86235] print:hidden" />
              Receita por Categoria
            </h3>
          </div>

          <div className="space-y-4 pt-2 print:space-y-2.5 print:pt-1">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5 print:text-[11px] print:mb-1">
                <span className="text-slate-700">Honorários Recorrentes</span>
                <span className="text-slate-900 font-bold">R$ 4.300,00 (58.9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden print:h-2">
                <div className="bg-[#C86235] h-full rounded-full" style={{ width: '58.9%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5 print:text-[11px] print:mb-1">
                <span className="text-slate-700">Projetos Especializados</span>
                <span className="text-slate-900 font-bold">R$ 2.500,00 (34.2%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden print:h-2">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '34.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5 print:text-[11px] print:mb-1">
                <span className="text-slate-700">Outros Serviços</span>
                <span className="text-slate-900 font-bold">R$ 500,00 (6.9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden print:h-2">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: '6.9%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status da Carteira */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 w-full print:p-4 print:rounded-xl print:border-slate-300 print:shadow-none print:break-inside-avoid">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 print:pb-2">
            <h3 className="text-base font-bold text-slate-900 print:text-sm">Status da Carteira Comercial</h3>
          </div>

          <div className="space-y-3 pt-1 print:space-y-2">
            <div className="flex items-center justify-between p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 print:p-2.5 print:bg-white print:border-slate-300">
              <span className="text-xs font-bold text-emerald-800 print:text-[11px] print:text-slate-800">Contratos Ativos</span>
              <span className="text-sm font-extrabold text-emerald-900 print:text-xs print:text-slate-900">2 Clientes</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-amber-50/60 rounded-xl border border-amber-100 print:p-2.5 print:bg-white print:border-slate-300">
              <span className="text-xs font-bold text-amber-800 print:text-[11px] print:text-slate-800">Em Negociação</span>
              <span className="text-sm font-extrabold text-amber-900 print:text-xs print:text-slate-900">1 Cliente</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60 print:p-2.5 print:bg-white print:border-slate-300">
              <span className="text-xs font-bold text-slate-600 print:text-[11px]">Leads em Qualificação</span>
              <span className="text-sm font-extrabold text-slate-800 print:text-xs">4 Oportunidades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé do PDF */}
      <div className="hidden print:flex items-center justify-between pt-4 border-t border-slate-200 text-[10px] text-slate-500">
        <span>Gerado por Sistema Piloto White-Label</span>
        <span>Página 1 de 1</span>
      </div>
    </div>
  );
}
