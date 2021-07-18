// mongodb
//require('./config/db');
const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

require('dotenv').config();
//const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');

// Password handler
const bcrypt = require("bcrypt");

//User token
const jwt = require('jsonwebtoken');


const { DB_URI, DB_NAME, JWT_SECRETKEY } = process.env;

const getToken = (id) => {
    return jwt.sign({id: id}, JWT_SECRETKEY, {expiresIn: '30 days'});
}

const getUserFromToken = async (token, db) => {
    if(!token) {
        return null;
    }
    const tokenData = jwt.verify(token, JWT_SECRETKEY);
    if(!tokenData?.id) {
        return null;
    }
    
    return await db.collection('Users').findOne({_id: ObjectId(tokenData.id)})
}

const typeDefs = gql`
    type Query {
        generalItemList: [GeneralItem]
    }

    type Mutation {
        signUp(input: SignUpInput): AuthUser!
        signIn(input: SignInInput): AuthUser!

        createGeneralItem(input: GeneralItemInput): GeneralItem!
    }

    input SignUpInput {
        username: String!
        email: String! 
        phone: String!
        password: String!
        avatar: String
    }

    input SignInInput {
        email: String!
        password: String!
    }

    input GeneralItemInput {
        title: String!
        description: String!
        category: String!
        exchangeMethod: String!
        image: String
    }

    type AuthUser {
        user: User!
        token: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        phone: String!
        password: String!
        avatar: String
    }

    type GeneralItem {
        id: ID!
        owner: User!
        title: String!
        description: String!
        category: String!
        exchangeMethod: String!
        image: String
        requests: [Request]
    }

    type Request {
        id: ID!
        requestingUser: User!
        item: GeneralItem!
    }
`;



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        generalItemList: () => []
    },
    Mutation: {
        signUp: async (root, { input }, { db }) => {

            //hash password
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(input.password, salt);
            //console.log(hashedPassword);

            const newUser = {
                ...input,
                password: hashedPassword,
            }

            //save to database
            const result = await db.collection('Users').insertOne(newUser);
            // id: result.insertedId } );
            return {
                user: {
                    id: result.insertedId,
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password
                },
                token: getToken(result.insertedId)
            }

        },
        signIn: async (_, { input }, { db }) => {
            const user = await db.collection('Users').findOne( {email: input.email} );
            if(!user) {
                throw new Error('Invalid Credentials!');
            }

            //check if password is correct
            const isPasswordCorrect = bcrypt.compareSync(input.password, user.password);
            if(!isPasswordCorrect) {
                throw new Error('Invalid Credentials!');
            }

            return {
                user,
                token: getToken(user._id)
            }
        },
        createGeneralItem: async (_, { input }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
        }
    },
    User: {
        id: ({ _id, id }) => _id || id,
    },
  };


const start = async () => {
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(DB_NAME);

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context: async ({req}) => {
            const user = await getUserFromToken(req.headers.authorization, db);
            console.log(user);
            return {
                db,
                user,
            }
        }, 
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
                // options
            })
        ] 
    });

    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    });
}

start();

// app.use(bodyParser());

// app.use('/user', UserRouter);

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


 