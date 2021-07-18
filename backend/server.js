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
    token = jwt.sign({id: id}, JWT_SECRETKEY, {expiresIn: '30 days'});
    console.log(token);
    return token;
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
        generalItemsList: [GeneralItem]!
        myGeneralItems: [GeneralItem]!
        getGeneralItem(id: ID!): GeneralItem!
    }

    type Mutation {
        signUp(input: SignUpInput): AuthUser!
        signIn(input: SignInInput): AuthUser!

        createGeneralItem(input: GeneralItemInput): GeneralItem!
        deleteGeneralItem(id: ID!): Boolean!
        requestItem(id: ID!, userId: ID!): GeneralItem!
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
        requests: [Request]!
    }

    type Request {
        requestingUserID: ID!
        item: GeneralItem
    }
`;



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        generalItemsList: async (_, __, {db}) => {
            return await db.collection('GeneralItems').find().toArray();
        },
        myGeneralItems: async (_, __, {db,user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            console.log(user._id);
            myCollection = await db.collection('GeneralItems').find({ "owner._id" : user._id }).toArray();
            console.log(myCollection);
            return myCollection;
        },
        getGeneralItem: async (_, { id }, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
   
            const item =  await db.collection('GeneralItems').findOne({_id: ObjectId(id)});
            //console.log(item);
            return item;
        }
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
            const newGeneralItem = {
                title: input.title, 
                description: input.description, 
                category: input.category, 
                exchangeMethod: input.exchangeMethod, 
                owner: user,
                requests: []
            }

            const result = await db.collection('GeneralItems').insertOne(newGeneralItem);
            return {
                ...newGeneralItem,
                id: result.insertedId
            }
        },
        deleteGeneralItem: async (_, { id }, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            //TODO: only owner of this item can delete
            await db.collection('GeneralItems').deleteOne({_id: ObjectId(id)})
            return true;

        },
        requestItem: async (_, { id, userId }, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const item = await db.collection('GeneralItems').findOne({_id: ObjectId(id)});
            
            const previousRequestArray = item.requests;
            previousRequestArray.push({"requestingUserID": userId, "item": null});
            //console.log(previousRequestArray);
            const result = await db.collection('GeneralItems').updateOne({ _id : ObjectId(id) },{ $set: { requests : previousRequestArray }})
            console.log(result);
            return await db.collection('GeneralItems').findOne({_id: ObjectId(id)});
        }
        
    },
    User: {
        id: ({ _id, id }) => _id || id,
    },
    GeneralItem: {
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
            //console.log(getToken("60f2cf2385c21cc1cabc9546"));
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


 