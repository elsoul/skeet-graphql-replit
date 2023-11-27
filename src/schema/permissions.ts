import { shield } from 'graphql-shield'
import { GraphQLError } from 'graphql'

export const permissions = shield(
  {
    Query: {},
    Mutation: {},
  },
  {
    fallbackError: async (thrownThing) => {
      console.log(thrownThing)
      if (thrownThing instanceof GraphQLError) {
        return thrownThing
      } else if (thrownThing instanceof Error) {
        return new GraphQLError('Internal server error')
      } else {
        return new GraphQLError('Not Authorized')
      }
    },
  },
)
