export const typeDefs = `#graphql


  type Post {
    id:ID!
    title:String!
    content:String!
    createdAt:String!
    published:Boolean!
    userId:Int
    user:User  
  }

  type User{
    id:ID!
    name:String!
    email:String!
    createdAt:String!
    posts:[Post]
 }

  type Profile {
    id:ID!
    country:String
    location:String
    age:String
    createdAt:String!
    user:User! 
  }



  type AuthResponse {
    message:String
    token:String
  }

  type ProfileResponse{
    message:String
    status:Int
    result:Profile
  }
  type PostResponse {
    message:String
    status:Int
    result:Post
  }

  input UpdateUserProfile {
    country:String
    location:String
    age:String
    updatedAt:String!
  }

  input PostData {
    title:String,
    content:String,
  }

  input PostPublish {
    published:Boolean
  }

  input ProfileCreate{
    userId:Int!
  }


  type Query {
    users:[User]
    profile:Profile
    posts:[Post]
  }




  type Mutation {
    signup(
        name :String!,
        email :String!,
        password :String!       
    ):AuthResponse

    signin( 
      email:String!,
      password:String!
    ):AuthResponse

    profile_create(
     
      profile:ProfileCreate,
    ):ProfileResponse

    profile_update(
      id:Int!,
      input:UpdateUserProfile
    ):ProfileResponse

    post_create(
      post:PostData!
    ):PostResponse

    post_publish(
      postId:ID!
      post:PostPublish!
    ):PostResponse

    post_update(
      postId:ID!
      post:PostData
    ):PostResponse

    post_delete(postId:ID!):PostResponse

  }
`;
//# sourceMappingURL=schema.js.map