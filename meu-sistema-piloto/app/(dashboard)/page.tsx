import Link from 'next/link';
import { Plus, Users, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500">Olá, vamos em frente</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Visão geral</h1>
          <p className="text-sm text-slate-500 mt-1">
            Um panorama simples das relações do seu negócio.
          </p>
        </div>

        <Link
          href="/clientes"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C86235] hover:bg-[#b0532b] text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Novo cliente
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Clientes cadastrados</span>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900">3</div>
          <p className="text-xs text-slate-400 border-t border-slate-100 pt-3">
            Na sua carteira de relacionamento
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Novos neste mês</span>
            <div className="w-10 h-10 bg-orange-50 text-[#C86235] rounded-xl flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900">2</div>
          <p className="text-xs text-slate-400 border-t border-slate-100 pt-3">
            Novas relações iniciadas
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Clientes recentes</h3>
            <p className="text-xs text-slate-500">
              Os contatos adicionados mais recentemente
            </p>
          </div>
          <Link
            href="/clientes"
            className="text-xs font-semibold text-[#C86235] hover:underline flex items-center gap-1"
          >
            Ver todos &rarr;
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Santos & Associados</p>
              <p className="text-xs text-slate-400">Carlos Eduardo Santos</p>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Ativo
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">TechInovação Soluções</p>
              <p className="text-xs text-slate-400">Mariana Oliveira</p>
            </div>
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
              Em Negociação
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}