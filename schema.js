const { gql } = require('apollo-server-express');

exports.typeDefs = gql `

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
    }

    type User {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        login(username: String!, password: String!): Message
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee
    }

    type Mutation {
        
        addEmployee(first_name: String!
            last_name: String!
            email: String!
            gender: String!
            salary: Float!): Employee

        updateEmployee(id: String!
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        
        deleteEmployee(id: String!): Employee

        signup(username: String!, 
            email: String!, 
            password: String!): User
                
    }

    type Message {
        message: String
        status: Boolean
        error: String
    }
`