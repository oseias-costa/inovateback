module.exports = `
  type Companie {
    cidade: String
    id: ID
    nome: String
    cnpj: String
  }

  type Query {
    companies(page: Int): [Companie]
  }

  type Mutation {
    newCompany(cidade: String, nome: String, cnpj: String): Companie!
    updateCompany(
      id: String
      cidade: String
      nome: String
      cnpj: String
    ): Companie!
    removeCompany(id: String): Companie!
  }
`