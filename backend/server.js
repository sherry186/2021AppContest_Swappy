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
        getInvitedRequests: [Request]! 
        getRequestingRequests: [Request]!
        getRequest(id: ID!):  Request!
        getRequestsByStatus(status: Status!): [Request]!
        getPosts: [Post]!
        getMyCollections: [Post]!
    }

    type Mutation {
        signUp(input: SignUpInput): AuthUser!
        signIn(input: SignInInput): AuthUser!

        createGeneralItem(input: GeneralItemInput): GeneralItem!
        deleteGeneralItem(id: ID!): Boolean!

        createRequestItem(requestedItemId: ID!): Request!
        updateStatus(id: ID!, status: Status!): Boolean!
        removeRequest(id: ID!): Boolean!
        updateRequestersItem(itemId: ID!, requestId: ID!): Boolean!

        createPost(title: String!, description: String!, hideUser: Boolean!): Post!
        postComment(postId: ID!, comment: String!): Boolean!

        addToCollection(postId: ID!): Boolean!
        removeFromCollection(postId: ID!): Boolean!
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
        postsCollection: [Post]
    }

    type GeneralItem {
        id: ID!
        owner: User!
        title: String!
        description: String!
        category: String!
        exchangeMethod: String!
        image: String
    }

    type Request {
        id: ID
        guyWhoseItemIsRequested: User!
        requestedItem: GeneralItem!
        requester: User!
        requestersItem: GeneralItem
        status: Status!
    }

    type Post {
        id: ID!
        title: String!
        description: String!
        author: User
        comments: [Comment]!
    }

    type Comment {
        user: User!
        comment: String!
    }

    enum Status {
        WAITING
        FAIL
        SUCCESS
    }
`;



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getMyCollections: async (_, __, { user }) => {
            return user.postsCollection ? user.postsCollection : null;
        },
        getPosts: async (_, __, {db}) => {
            return await db.collection('Posts').find().toArray();
        },
        generalItemsList: async (_, __, {db}) => {
            return await db.collection('GeneralItems').find().toArray();
        },
        myGeneralItems: async (_, __, {db,user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            console.log(user._id);
            const myCollection = await db.collection('GeneralItems').find({ "owner._id" : user._id }).toArray();
            console.log(myCollection);
            return myCollection;
        },
        getGeneralItem: async (_, { id }, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
   
            const item =  await db.collection('GeneralItems').findOne({_id: ObjectId(id)});
            console.log(getToken(item.owner._id));
            return item;
        }, 
        getInvitedRequests: async (_, __, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const myInvitedRequests = await db.collection('Requests').find({ "guyWhoseItemIsRequested._id" : user._id }, {status: "WAITING"}).toArray();
            console.log(myInvitedRequests);
            return myInvitedRequests;
        }, 
        getRequestingRequests: async (_, __, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const myRequestingRequests = await db.collection('Requests').find({ "requester._id" : user._id }).toArray();
            console.log(myRequestingRequests);
            return myRequestingRequests;
        },
        getRequest: async (_, { id }, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const item =  await db.collection('Requests').findOne({_id: ObjectId(id)});
            //console.log(item);
            return item;
        },
        getRequestsByStatus: async (_, { status }, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const requests= await db.collection('Requests').find({status: status}).toArray();
            return requests;
        }

    },
    Mutation: {
        removeFromCollection: async (_, { postId }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const post = await db.collection('Posts').findOne({_id: ObjectId(postId)});
            await db.collection('Users').updateOne({ _id : ObjectId(user._id) },{ $pull: { postsCollection: post }});
            return true;
        },
        addToCollection: async (_, { postId }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const post = await db.collection('Posts').findOne({_id: ObjectId(postId)});
            await db.collection('Users').updateOne({ _id : ObjectId(user._id) },{ $push: { postsCollection: post }});
            return true;
        },
        postComment:　async (_, { postId, comment }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const _comment = {
                user: user,
                comment: comment
            }
            await db.collection('Posts').updateOne({ _id : ObjectId(postId) },{ $push: { comments: _comment }});
            return true;
        },
        createPost: async (_, { title, description, hideUser }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const newPost = {
                title: title,
                description: description,
                author: hideUser? null : user,
                comments: [], 
            }

            const result = await db.collection('Posts').insertOne(newPost);
            
            return  {
                ...newPost,
                id: result.insertedId
            }
        },
        updateRequestersItem: async (_, { itemId, requestId }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const item = await db.collection('GeneralItems').findOne({_id: ObjectId(itemId)});
            await db.collection('Requests').updateOne({ _id : ObjectId(requestId) },{ $set: { requestersItem: item }});

            return true;
        },
        removeRequest: async (_, { id }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }

            //TODO: only owner of this item can delete
            await db.collection('Requests').deleteOne({_id: ObjectId(id)})
            return true;
        },
        updateStatus: async (_, { id, status }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }

            await db.collection('Requests').updateOne({ _id : ObjectId(id) },{ $set: { status: status }});
            return true;

        }, 
        createRequestItem: async (_, { requestedItemId }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }

            const requestedItem = await db.collection('GeneralItems').findOne({_id: ObjectId(requestedItemId)});
            console.log(requestedItem);
            const guyWhoseItemIsRequested = await db.collection('Users').findOne({_id: ObjectId(requestedItem.owner._id)});
            const requester = user;

            const newRequest = {
                guyWhoseItemIsRequested: guyWhoseItemIsRequested,
                requestedItem: requestedItem,
                requester: requester,
                requestersItem: null, 
                status: 'WAITING'
            }

            const result = await db.collection('Requests').insertOne(newRequest);
            
            return  {
                ...newRequest,
                id: result.insertedId
            }
        },

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
            console.log("signed up!");
            //save to database
            const result = await db.collection('Users').insertOne(newUser);
            // id: result.insertedId } );
            return {
                user: {
                    id: result.insertedId,
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password, 
                    phone: newUser.phone
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
        // requestItem: async (_, { id, userId }, {db, user}) => {
        //     if(!user) {
        //         throw new Error('AUthentication Error. Please sign in');
        //     }
        //     const item = await db.collection('GeneralItems').findOne({_id: ObjectId(id)});
            
        //     const previousRequestArray = item.requests;
        //     previousRequestArray.push({"requestingUserID": userId, "item": null});
        //     //console.log(previousRequestArray);
        //     const result = await db.collection('GeneralItems').updateOne({ _id : ObjectId(id) },{ $set: { requests : previousRequestArray }})
        //     console.log(result);
        //     return await db.collection('GeneralItems').findOne({_id: ObjectId(id)});
        // }
        
    },
    User: {
        id: ({ _id, id }) => _id || id,
    },
    GeneralItem: {
        id: ({ _id, id }) => _id || id,
    },
    Request: {
        id: ({ _id, id }) => _id || id,
    },
    Post: {
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

console.log(getToken('60f55abf6cb420ec4427fe72'));

start();

// app.use(bodyParser());

// app.use('/user', UserRouter);

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


 