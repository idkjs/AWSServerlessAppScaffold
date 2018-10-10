export interface Contato {
    tipo: string;
    contato: string;
}

export interface Cidade {
    codigoIbge: string;
    uf: string;
    nome: string;
}

export interface Endereco {
    cep: string;
    cidade: Cidade;
    bairro: string;
    complemento: string;
    numero: string;
    logradouro: string;
}

export interface Empresa {
    empresaId: string;
    cnpj: string;
    nome: string;
    alias: string;
    cnae: { code: string; description: string; };
    natureza: { code: string; description: string; };
    enderecos: [Endereco];
    contatos: [Contato];
}
