module.exports = `
  type User {
    email: String
    nivel: String
    id: ID
    nome: String
    senha: String
  }

  type Query {
    users: [User]
    user(id: String): User
  }
`