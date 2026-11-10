export default function ConfiguracoesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações do Sistema</h1>
        <p className="text-xs text-slate-500 mt-1">
          Personalize a identidade da empresa e parâmetros globais.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
          Perfil da Empresa
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Nome da Empresa</label>
            <input
              type="text"
              defaultValue="Albert Tech"
              className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Domínio / Subdomínio</label>
            <input
              type="text"
              defaultValue="piloto.alberttech.com.br"
              className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button className="px-4 py-2 bg-[#C86235] text-white text-sm font-medium rounded-xl hover:bg-[#b0532b] shadow-sm">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}