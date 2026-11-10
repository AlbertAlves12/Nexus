'use client';

export default function ConfiguracoesPage() {
  return (
    <div className="w-full space-y-8 font-sans">
      <div className="border-b border-slate-200/60 pb-6 w-full">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Configurações White-Label</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Personalize a identidade da empresa contratante, cores da marca e domínio.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 w-full">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4">
          Perfil da Empresa & Marca
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div>
            <label className="text-xs font-semibold text-slate-600">Nome da Empresa</label>
            <input
              type="text"
              defaultValue="Albert Tech"
              className="w-full mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Domínio / Subdomínio</label>
            <input
              type="text"
              defaultValue="piloto.alberttech.com.br"
              className="w-full mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C86235]/20 focus:border-[#C86235]"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button className="px-6 py-2.5 bg-[#C86235] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#b0532b] shadow-sm shadow-[#C86235]/30 transition-all">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
