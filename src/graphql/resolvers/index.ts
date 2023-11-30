
import { Mutation } from "./mutation/mutation";
import { Query } from "./query/query";
import { Post } from "./relation/Post";
import { User } from "./relation/User";
import { Profile } from "./relation/Profile";

export const resolvers = {
  Query,
  Mutation,
  Post,
  User,
  Profile
};
