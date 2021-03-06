
//const { ApolloServer, gql } = require('apollo-server');
const { createWriteStream } = require('fs');
const express = require('express');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');


const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

require('dotenv').config();
//const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');

var partition = require('lodash.partition');
var filter = require('lodash.filter');

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
    scalar JSON
    scalar JSONObject
    scalar Upload
    type Query {
        getMyGroupItems(groupId: ID!): [GroupItem]!
        getUserById(id: ID!): User!
        getMySuccessfulRequests: [Request]!
        getUser: User!
        generalItemsList: [GeneralItem]!
        myGeneralItems: [GeneralItem]!
        getGeneralItem(id: ID!): GeneralItem!
        getInvitedRequests: [Request]! 
        getRequestingRequests: [Request]!
        getRequest(id: ID!):  Request!
        getRequestsByStatus(status: Status!): [Request]!
        getPosts: [Post]!
        getPost(id: ID!): Post!
        getMyCollections: [Post]!
        getGroups: [Group]!
        getGroup(id: ID!): Group!
        filterMatchingGroupItems(id: ID!): JSONObject!
        getUsersWishTags(userId: ID!, groupId: ID!): JSONObject
    }

    type Mutation {
        updateRatingAndReviews(requestId: ID!, userId: ID!, input: ReviewInput!): Boolean!
        receiveRequest(requestId: ID!):Request!
        deleteFail: Boolean!

        resetUser(username: String!, email: String!, phone: String!, password: String!, avatar: String): Boolean!
        uploadFile(file: Upload!): File!

        signUp(input: SignUpInput): AuthUser!
        signIn(input: SignInInput): AuthUser!

        createGeneralItem(input: GeneralItemInput): GeneralItem!
        deleteGeneralItem(id: ID!): Boolean!

        createRequestItem(requestedItemId: ID!, groupId: ID): Request!
        updateStatus(id: ID!, status: Status!): Boolean!
        removeRequest(id: ID!): Boolean!
        updateRequestersItem(groupId: ID, itemId: ID!, requestId: ID!): Boolean!

        createPost(title: String!, description: String!, hideUser: Boolean!, time: String): Post!
        postComment(postId: ID!, comment: String!, time: String): Boolean!

        addToCollection(postId: ID!): Boolean!
        removeFromCollection(postId: ID!): Boolean!

        addGroup(title: String!, description: String! tags: [String]!): Group!
        createGroupItem(groupId: ID!, input: GroupItemInput):Boolean!
        addWishList(groupId:ID!, tags: [String]!): Boolean!
    }

    input GroupItemInput {
        title: String,
        tag: String, 
        description: String!, 
        exchangeMethod: ExchangeMethod!, 
        image: String
    }

    input ReviewInput {
        rating: Float!
        comment: String!
        date: String!
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

    type File {
        url: String!
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
        ratingSum: Int
        totalRatings: Int
        reviews: [Review]
    }

    type Review {
        user: User!
        rating: Float!
        comment: String!
        date: String!
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

    type GroupItem {
        id: ID!
        owner: User!
        title: String!
        description: String!
        category: String!
        exchangeMethod: String!
        image: String
    }

    type Group {
        id: ID!
        title: String!
        description: String!
        tags: [String]!
        groupItems: [GroupItem]!
        wishList: JSONObject! 
    }

    type wishListItem {
        id: ID!
        user: User!
        wantTags: [String]!
        haveTags: [String]!
    }

    type Request {
        id: ID
        guyWhoseItemIsRequested: User!
        requestedItem: GeneralItem!
        requester: User!
        requestersItem: GeneralItem
        status: Status!
        guyWhoseItemIsRequestedReceived: Boolean!
        guyWhoseItemIsRequestedScored: Boolean!
        requesterReceived: Boolean!
        requesterScored: Boolean!
        groupId: ID
    }

    type Post {
        id: ID!
        title: String!
        description: String!
        author: User
        comments: [Comment]!
        time: String
    }

    type Comment {
        user: User!
        comment: String!
        time: String
    }

    enum Status {
        WAITING
        FAIL
        SUCCESS
    }

    enum ExchangeMethod{
        FACETOFACE
        BYPOST
        BOTH
        NOTSELECTED
    }
`;





// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getUsersWishTags: async (_, { userId, groupId }, {db,user}) => {
            var group = await db.collection('Groups').findOne({_id: ObjectId(groupId)});
            return group?.wishList[userId]?.wishTags;
            //group.wishList[user._id].wishTags
        },
        getMyGroupItems: async (_, { groupId }, {db,user}) => {
            var group = await db.collection('Groups').findOne({_id: ObjectId(groupId)});
            var groupItems = group.groupItems;
            var myGroupItems = filter(groupItems, function(item) { 
                return item.owner._id.equals(user._id); 
             });
            
            return myGroupItems;
        },
        getUserById: async (_, { id }, {db,user}) => {
            return await db.collection('Users').findOne({_id: ObjectId(id)});
        },
        getMySuccessfulRequests: async (_, __, {db,user}) => {
            return await db.collection('Requests').find({ $and: [ { $or: [ {"guyWhoseItemIsRequested._id" : user._id }, {"requester._id" : user._id }]}, {status: "SUCCESS"}]}).toArray();
        },
        getUser: async (_, __, {db,user}) => {
            const _user =  await db.collection('Users').findOne({_id: ObjectId(user._id)});
            return _user;
        },
        filterMatchingGroupItems: async (_, { id }, {db,user}) => {
            var group = await db.collection('Groups').findOne({_id: ObjectId(id)});
            var groupItems = group.groupItems;
            //console.log(group);
            //???????????????????????????wishTags???haveTags (????????????)
            if(group.wishList[user._id] == undefined || group.wishList[user._id].wishTags == undefined || group.wishList[user._id].haveTags == undefined) {
                //console.log(group.wishList[user._id]);
                return {
                    matchedItems: [],
                    unmatchedItems: groupItems
                }
            } else {
                const isWhatTheUserWants = (item) => {
                    return group.wishList[user._id].wishTags[item.category];
                };
                const canOfferWhatTheOwnerWants = (item) => {
                    if(group.wishList[item.owner._id].wishTags == undefined) {
                        return false;
                    } else {
                        for (const tag in group.wishList[item.owner._id].wishTags) {
                            if(group.wishList[user._id].haveTags[tag]) {
                                return true;
                            }
                        }
                        return false;
                    }
                };
                partitionedGroupItems = partition(groupItems, function(item) {
                    if(item.owner == undefined || item.owner._id.equals(user._id)) {
                        return false
                    } else {
                        return isWhatTheUserWants(item) && canOfferWhatTheOwnerWants(item);
                    }
                })

                return {
                    matchedItems: partitionedGroupItems[0],
                    unmatchedItems: partitionedGroupItems[1]
                }
            }
        },
        getGroup: async (_, { id }, {db}) => {
            return await db.collection('Groups').findOne({_id: ObjectId(id)});
        },
        getGroups: async (_, __, {db}) => {
            return await db.collection('Groups').find().toArray();
        },
        getMyCollections: async (_, __, { user }) => {
            //console.log(user.postsCollection);
            return user.postsCollection ? user.postsCollection : null;
        },
        getPost: async (_, { id }, {db}) => {
            return await db.collection('Posts').findOne({_id: ObjectId(id)});
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
            //console.log(user._id);
            const myCollection = await db.collection('GeneralItems').find({ "owner._id" : user._id }).toArray();
            //console.log(myCollection);
            return myCollection;
        },
        getGeneralItem: async (_, { id }, {db, user}) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
   
            const item =  await db.collection('GeneralItems').findOne({_id: ObjectId(id)});
            //console.log(getToken(item.owner._id));
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
        updateRatingAndReviews: async (_, {requestId, userId, input}, {db, user})=>{
            const commentingUser = await db.collection('Users').findOne({_id: ObjectId(user._id)});
            const review = {
                user: commentingUser,
                rating: input.rating,
                comment: input.comment,
                date: input.date
            }
            await db.collection('Users').updateOne({_id: ObjectId(userId)},{ $push: { reviews: review }});

            const user_ = await db.collection('Users').findOne({_id: ObjectId(userId)});
            const newSum = user_.ratingSum + input.rating;
            const newTotal = user_.totalRatings + 1;
            await db.collection('Users').updateOne({_id: ObjectId(userId)},{ $set: { ratingSum: newSum, totalRatings: newTotal}});

            const request = await db.collection('Requests').findOne({_id: ObjectId(requestId)});
            console.log(request.guyWhoseItemIsRequested._id.equals(user._id));
            if (request.guyWhoseItemIsRequested._id.equals(user._id)) {
                await db.collection('Requests').updateOne({_id: ObjectId(requestId)},{ $set: { guyWhoseItemIsRequestedScored: true }});
            } else {
                await db.collection('Requests').updateOne({_id: ObjectId(requestId)},{ $set: { requesterScored: true }});
            }

            return true;
        },
        receiveRequest: async (_, { requestId }, { db, user }) => {
            const request = await db.collection('Requests').findOne({_id: ObjectId(requestId)});
            console.log(request.guyWhoseItemIsRequested._id.equals(user._id));
            if (request.guyWhoseItemIsRequested._id.equals(user._id)) {
                await db.collection('Requests').updateOne({_id: ObjectId(requestId)},{ $set: { guyWhoseItemIsRequestedReceived: true }});
            } else {
                await db.collection('Requests').updateOne({_id: ObjectId(requestId)},{ $set: { requesterReceived: true }});
            }
            const request_ = await db.collection('Requests').findOne({_id: ObjectId(requestId)});
            return request_;
        },
        deleteFail: async (_, __, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }

            await db.collection('Requests').deleteMany({status: "FAIL", "requester._id" : user._id});
            return true;
        },
        resetUser: async (_, { username, email, phone, password, avatar }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }

            //hash password
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            await db.collection('Users').updateOne({ _id : ObjectId(user._id) },
                { $set: { 
                    username : username, 
                    email : email, 
                    password : hashedPassword, 
                    phone : phone, 
                    avatar: avatar
                }});
            return true;
        },
        uploadFile: async(_, { file })=> {
            const {createReadStream, filename, mimetype, encoding } = await file;
            const stream = createReadStream();
            const pathName = path.join(__dirname, `/public/images/${filename}`)
            await stream.pipe(createWriteStream(pathName))

            return {
                url: `http://swappy.ngrok.io/images/${filename}`
            }
        },
        removeFromCollection: async (_, { postId }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const post = await db.collection('Posts').findOne({_id: ObjectId(postId)});
            const result = await db.collection('Users').updateOne({ _id : ObjectId(user._id) },{ $pull: { postsCollection: post }});
            console.log(result);
            return true;
        },
        addToCollection: async (_, { postId }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            console.log(user._id);
            const post = await db.collection('Posts').findOne({_id: ObjectId(postId)});
            const result = await db.collection('Users').updateOne({ _id : ObjectId(user._id) },{ $push: { postsCollection: post }});
            console.log(result);
            return true;
        },
        postComment:???async (_, { postId, comment, time }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const _comment = {
                user: user,
                comment: comment,
                time: time
            }
            await db.collection('Posts').updateOne({ _id : ObjectId(postId) },{ $push: { comments: _comment }});
            return true;
        },
        createPost: async (_, { title, description, hideUser, time }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const newPost = {
                title: title,
                description: description,
                author: hideUser? null : user,
                comments: [], 
                time: time
            }

            const result = await db.collection('Posts').insertOne(newPost);
            
            return  {
                ...newPost,
                id: result.insertedId
            }
        },
        updateRequestersItem: async (_, { groupId, itemId, requestId }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }

            var item;
            if( groupId == null || groupId == undefined) {
                item = await db.collection('GeneralItems').findOne({_id: ObjectId(itemId)});
            } else {
                item = await db.collection('GroupItems').findOne({_id: ObjectId(itemId)});
            }
            
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
        createRequestItem: async (_, { requestedItemId, groupId }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }

            let requestedItem;
            if(groupId == null) {
                requestedItem = await db.collection('GeneralItems').findOne({_id: ObjectId(requestedItemId)});
            } else {
                requestedItem = await db.collection('GroupItems').findOne({_id: ObjectId(requestedItemId)});
            }
            
            console.log(requestedItem);
            const guyWhoseItemIsRequested = await db.collection('Users').findOne({_id: ObjectId(requestedItem.owner._id)});
            const requester = user;

            const newRequest = {
                guyWhoseItemIsRequested: guyWhoseItemIsRequested,
                requestedItem: requestedItem,
                requester: requester,
                requestersItem: null, 
                status: 'WAITING',
                guyWhoseItemIsRequestedReceived: false, 
                guyWhoseItemIsRequestedScored: false, 
                requesterReceived: false, 
                requesterScored: false,
                groupId: groupId
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
                reviews: [],
                ratingSum: 0,
                totalRatings: 0,
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
                    phone: newUser.phone,
                    reviews: [],
                    ratingSum: 0,
                    totalRatings: 0
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
        addGroup: async (_, { title, description, tags }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const newGroup = {
                title: title,
                description: description,
                tags: tags,
                groupItems: [],
                wishList: {}
            }
            console.log(title);
            const result = await db.collection('Groups').insertOne(newGroup);
            return {
                ...newGroup,
                id: result.insertedId
            }
        },
        addWishList: async (_, { groupId, tags }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const group = await db.collection('Groups').findOne({_id: ObjectId(groupId)});
            //console.log(group);
            let tagsObject = {};
            tags.forEach(function(v) { tagsObject[v] = true; });
            if(group.wishList[user._id] == undefined || group.wishList[user._id] == null) {
                group.wishList[user._id] = {};
            } 
            group.wishList[user._id].wishTags = tagsObject;
            console.log(group.wishList);
            const result = await db.collection('Groups').updateOne({ _id : ObjectId(groupId) },{ $set: { wishList: group.wishList }});
            return true;
        },
        createGroupItem: async (_, { groupId, input }, { db, user }) => {
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const group = await db.collection('Groups').findOne({_id: ObjectId(groupId)});
            //console.log(group);
            console.log(group.wishList[user._id]);

            // type GroupItem {
            //     id: ID!
            //     owner: User!
            //     title: String!
            //     description: String!
            //     category: String!
            //     exchangeMethod: String!
            //     image: String
            // }

            if(group.wishList[user._id] == undefined || group.wishList[user._id] == null) {
                let tagsObject = {};
                tagsObject[input.tag] = true;
                group.wishList[user._id] = {};
                group.wishList[user._id].haveTags = tagsObject;
            } else if (group.wishList[user._id].haveTags == undefined || group.wishList[user._id].haveTags == null) {
                let tagsObject = {};
                tagsObject[input.tag] = true;
                group.wishList[user._id].haveTags = tagsObject;
            } else {
                let tagsObject = group.wishList[user._id].haveTags;
                tagsObject[input.tag] = true;
                group.wishList[user._id].haveTags = tagsObject;
            }

            await db.collection('Groups').updateOne({_id: ObjectId(groupId)}, { $set: { wishList: group.wishList }});

            const newGroupItem = {
                title: input.title,
                description: input.description,
                category: input.tag,
                exchangeMethod: input.exchangeMethod,
                image: input.image,
                owner: user
            }
            const result = await db.collection('GroupItems').insertOne(newGroupItem);
            const newGroupItemWithId = {
                ...newGroupItem
            }
            await db.collection('Groups').updateOne({ _id : ObjectId(groupId) },{ $push: { groupItems: newGroupItemWithId }});
            return true;
        },
        createGeneralItem: async (_, { input }, { db, user }) => {
            console.log('create Gen item!');
            if(!user) {
                throw new Error('AUthentication Error. Please sign in');
            }
            const newGeneralItem = {
                title: input.title, 
                description: input.description, 
                category: input.category, 
                exchangeMethod: input.exchangeMethod, 
                image: input.image,
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
    Group: {
        id: ({ _id, id }) => _id || id,
    },
    GroupItem: {
        id: ({ _id, id }) => _id || id,
    },
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Upload: GraphQLUpload,
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
            //console.log(getToken("60f96890d500fa3e0481725c"));
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

    // // The `listen` method launches a web server.
    // server.listen().then(({ url }) => {
    // console.log(`????  Server ready at ${url}`);
    // });

    // Required logic for integrating with Express
    await server.start();
    const app = express();
    app.use(graphqlUploadExpress());
    server.applyMiddleware({
    app,

     // By default, apollo-server hosts its GraphQL endpoint at the
     // server root. However, *other* Apollo Server packages host it at
     // /graphql. Optionally provide this to match apollo-server.
     //path: '/'
    });
    app.use(express.static('public'))
    // Modified server startup
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`???? Server ready at http://localhost:4000${server.graphqlPath}`);
}

console.log(getToken('610fd7870294df9abcb7c61c'));

start();

// app.use(bodyParser());

// app.use('/user', UserRouter);

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


 