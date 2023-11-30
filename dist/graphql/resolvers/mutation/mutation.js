import { authResolvers } from './auth';
import { postResolvers } from './post';
import { profileResolvers } from './profile';
export const Mutation = {
    ...authResolvers,
    ...postResolvers,
    ...profileResolvers
};
//# sourceMappingURL=mutation.js.map