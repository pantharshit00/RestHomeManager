const { GraphQLServer } = require("graphql-yoga")
const { Prisma } = require("prisma-binding")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const AuthPayload = require("./resolvers/AuthPayload")
const scheduler = require('node-schedule');

var rule = new scheduler.RecurrenceRule();
rule.dayOfWeek = [0, new scheduler.Range(0, 6)];
// rule.hour = 20;
rule.hour = null;
rule.minute = null;
 
// var j = scheduler.scheduleJob(rule, function(){
//   console.log('Today is recognized by Rebecca Black!');
// })
// scheduler.scheduleJob(rule,j);

const doSomeStuff = async () =>   {
  async function allUsers(root, args, context, info) {
    const theUsers = await context.db.query.users({}, info)
    return theUsers
  }
  const allUserSoFar = allUsers()
  console.log("allUserSoFar ->", allUserSoFar)
}

console.log("Please schedule ") 
scheduler.scheduleJob(rule, function(){
  console.log('Today is recognized by Tron!');
  doSomeStuff()
})



const resolvers = {
  Query,
  Mutation,
  AuthPayload,
}

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "https://us1.prisma.sh/heath-dunlop-37e897/RestHomeManager/dev",
      secret: "win-win-win",
      debug: true,
    }),
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))