'use client';

import Link from 'next/link';
import {
  Plus,
  Users,
  Wallet,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="w-full space-y-8 font-sans">
      {/* Cabeçalho de Boas-Vindas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6 w-full">
        <div>
          <span className="text-xs font-semibold text-[#C86235] uppercase tracking-wider">
            Painel Executivo
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Visão Geral do Negócio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Resumo consolidado de faturamento, novos clientes e chamados de suporte.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/clientes"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C86235] hover:bg-[#b0532b] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm shadow-[#C86235]/30"
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </Link>
        </div>
      </div>

      {/* Grid de 4 Indicadores (Preenchimento 100% Fluido) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3 w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Receita no Mês
            </span>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">R$ 14.600,00</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold pt-2 border-t border-slate-100">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% em relação ao mês anterior</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3 w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Clientes Ativos
            </span>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">12</div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>3 em prospecção ativa</span>
            <span className="font-medium text-slate-700">100% retenção</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3 w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Chamados no WhatsApp
            </span>
            <div className="w-10 h-10 bg-orange-50 text-[#C86235] rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">3 Pendentes</div>
          <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold pt-2 border-t border-slate-100">
            <Clock className="w-3.5 h-3.5" />
            <span>Tempo médio de resposta: 8 min</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3 w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Adimplência
            </span>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">95.2%</div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Apenas 1 fatura pendente</span>
          </div>
        </div>
      </div>

      {/* Seção Inferior: Gráfico Fluid + Feed de Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {/* Gráfico Sintético (Ocupa 3 colunas em telas ultra-wide) */}
        <div className="lg:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Evolução do Faturamento</h3>
              <p className="text-xs text-slate-500">Comparativo dos últimos 6 meses</p>
            </div>
            <span className="text-xs font-bold text-[#C86235] bg-[#C86235]/10 px-3 py-1 rounded-full">
              Meta Batida (+15%)
            </span>
          </div>

          {/* Gráfico de Barras Esticado de Ponta a Ponta */}
          <div className="h-56 flex items-end justify-between gap-4 pt-4 px-2 w-full">
            {[
              { mes: 'Junho', valor: 'R$ 9.200', pct: '50%' },
              { mes: 'Julho', valor: 'R$ 10.500', pct: '62%' },
              { mes: 'Agosto', valor: 'R$ 11.800', pct: '72%' },
              { mes: 'Setembro', valor: 'R$ 12.400', pct: '78%' },
              { mes: 'Outubro', valor: 'R$ 13.100', pct: '85%' },
              { mes: 'Novembro', valor: 'R$ 14.600', pct: '100%', destaque: true },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.valor}
                </span>
                <div className="w-full bg-slate-100 h-40 rounded-xl relative overflow-hidden flex items-end">
                  <div
                    className={`w-full rounded-xl transition-all duration-500 ${
                      bar.destaque ? 'bg-[#C86235]' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    style={{ height: bar.pct }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600 mt-1">{bar.mes}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feed de Atividades Recentes */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5 w-full">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Atividades Recentes</h3>
            <Link href="/atendimento" className="text-xs font-bold text-[#C86235] hover:underline flex items-center gap-1">
              Ver tudo <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">Fatura #104 Quitada</p>
                <p className="text-[11px] text-slate-500 truncate">Santos & Associados • R$ 2.500,00</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Há 15 minutos</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">Novo Chamado no WhatsApp</p>
                <p className="text-[11px] text-slate-500 truncate">TechInovação • Solicitação Fiscal</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Há 42 minutos</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">Novo Cliente Cadastrado</p>
                <p className="text-[11px] text-slate-500 truncate">Distribuidora Borborema</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Hoje às 09:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
