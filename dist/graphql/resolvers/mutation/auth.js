import bcrypt from 'bcrypt';
import { jwtHelper } from '../../../utils/jwtValidation';
export const authResolvers = {
    signup: async (parnet, args, { prisma }) => {
        //check if user exist
        const isExist = await prisma.user.findFirst({
            where: {
                email: args.email
            }
        });
        if (isExist) {
            return {
                message: 'This user already exist',
                token: null
            };
        }
        //hash password
        const hashedPass = await bcrypt.hash(args.password, 12);
        try {
            const newUser = await prisma.user.create({
                data: {
                    ...args,
                    password: hashedPass
                }
            });
            const token = await jwtHelper.createToken(newUser.id);
            return {
                message: `${newUser.role} created successfully`,
                token: token
            };
        }
        catch (error) {
            return {
                message: 'User not created',
                token: null
            };
        }
    },
    signin: async (parent, args, { prisma }) => {
        //check if user exist
        const isExist = await prisma.user.findFirst({
            where: {
                email: args.email
            }
        });
        if (!isExist) {
            return {
                message: 'User not exist',
                token: null
            };
        }
        //decrypt password and compare if valid
        const decryptPass = await bcrypt.compare(args.password, isExist.password);
        if (!decryptPass) {
            return {
                message: 'Email or Password Not match',
                token: null
            };
        }
        const token = await jwtHelper.createToken(isExist.id);
        return {
            message: 'User Loggedin successfully',
            token: token
        };
    },
};
//# sourceMappingURL=auth.js.map