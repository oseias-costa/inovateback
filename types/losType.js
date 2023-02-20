module.exports = `
  type Task {
    ano: Int
    atividade: String
    empresa: String
    id: ID
    mes: String
    prazo: String
    realizado: String
    responsavel: String
    situacao: String
    creadedAt: Int
    frequencia: String
  }

  type TaskItemList {
    year: Int
    responsible: String
    company: String
    month: String
    key: Int
  }

  type Query {
    los(
      status: String
      responsible: String
      month: String
      year: Int
      frequency: String
      company: String
      page: Int
    ): [Task]
    los: [Task]
    
    loItemsFilter(
      status: String
      responsible: String
      month: String
      year: Int
      frequency: String
      company: String
    ): [TaskItemList]
  }

  input TaskInput {
    ano: Int
    atividade: String
    empresa: String
    id: ID
    mes: String
    prazo: String
    realizado: String
    responsavel: String
    situacao: String
    creadedAt: Int
    frequencia: String
  }

  type Mutation {
    newLo(
      ano: Int
      atividade: String
      empresa: String
      id: ID
      mes: String
      prazo: String
      realizado: String
      responsavel: String
      situacao: String
      creadedAt: Int
      frequencia: String
      ): Task!

  updateLo(
    ano: Int
    atividade: String
    empresa: String
    id: String
    mes: String
    prazo: String
    realizado: String
    responsavel: String
    situacao: String
    creadedAt: Int
    frequencia: String
  ): Task!

  removeLo(id: String): Task!
}
`