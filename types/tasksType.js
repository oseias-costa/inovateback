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

  type Query {
    tasks(
      status: String
      responsible: String
      month: String
      year: Int
      frequency: String
      company: String
      page: Int
    ): [Task]
    tasks: [Task]
  }

  type Mutation {
    newTask(
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

  updateTask(
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

  removeTask(id: String): Task!
}

`