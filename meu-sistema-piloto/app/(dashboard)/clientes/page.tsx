'use client';

import { useState } from 'react';
import { Plus, Search, Building2, Phone, Mail, CheckCircle2, Clock } from 'lucide-react';

interface Cliente {
  id: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  status: 'Ativo' | 'Em Negociação';
  valorContrato: string;
}

const CLIENTES_INICIAIS: Cliente[] = [
  {
    id: '1',
    nome: 'Carlos Eduardo Santos',
    empresa: 'Santos & Associados',
    email: 'carlos@santosassoc.com.br',
    telefone: '(83) 99876-5432',
    status: 'Ativo',
    valorContrato: 'R$ 2.500,00',
  },
  {
    id: '2',
    nome: 'Mariana Oliveira',
    empresa: 'TechInovação Soluções',
    email: 'mariana@techinovacao.com',
    telefone: '(83) 98123-4567',
    status: 'Em Negociação',
    valorContrato: 'R$ 4.800,00',
  },
  {
    id: '3',
    nome: 'Roberto Fonseca',
    empresa: 'Distribuidora Borborema',
    email: 'roberto@fonsecadist.com',
    telefone: '(83) 99111-2233',
    status: 'Ativo',
    valorContrato: 'R$ 1.800,00',
  },
];

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(CLIENTES_INICIAIS);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const [novoNome, setNovoNome] = useState('');
  const [novaEmpresa, setNovaEmpresa] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.empresa.toLowerCase().includes(busca.toLowerCase())
  );

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome || !novaEmpresa) return;

    const novo: Cliente = {
      id: String(clientes.length + 1),
      nome: novoNome,
      empresa: novaEmpresa,
      email: novoEmail || 'contato@cliente.com',
      telefone: novoTelefone || '(83) 99999-0000',
      status: 'Ativo',
      valorContrato: 'R$ 2.000,00',
    };

    setClientes([novo, ...clientes]);
    setNovoNome('');
    setNovaEmpresa('');
    setNovoEmail('');
    setNovoTelefone('');
    setModalAberto(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Carteira de Clientes</h1>
          <p className="text-xs text-slate-500 mt-1">
            Gerencie seus contatos e empresas.
          </p>
        </div>

        <button
          onClick={() => setModalAberto(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C86235] hover:bg-[#b0532b] text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Buscar por cliente ou empresa..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
            <tr>
              <th className="px-6 py-3.5">Cliente / Empresa</th>
              <th className="px-6 py-3.5">Contato</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Contrato</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{cliente.nome}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" />
                    {cliente.empresa}
                  </div>
                </td>
                <td className="px-6 py-4 space-y-0.5">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {cliente.email}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {cliente.telefone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      cliente.status === 'Ativo'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {cliente.status === 'Ativo' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {cliente.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {cliente.valorContrato}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Cadastrar Novo Cliente</h3>
            <form onSubmit={handleCadastrar} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600">Nome do Contato</label>
                <input
                  type="text"
                  required
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">Empresa</label>
                <input
                  type="text"
                  required
                  value={novaEmpresa}
                  onChange={(e) => setNovaEmpresa(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="Ex: ACME Corp"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">E-mail</label>
                <input
                  type="email"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="joao@acme.com"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">Telefone</label>
                <input
                  type="text"
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
                  placeholder="(83) 99999-0000"
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
                  className="px-4 py-2 bg-[#C86235] text-white text-sm font-medium rounded-lg hover:bg-[#b0532b]"
                >
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}