

export const postResolvers = {
    post_create: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
       
        const isExist = await prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        })
        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }
      
        const post_created = await prisma.post.create({
            data: {
                ...post,
                userId: userInfo.userId
            }
        })
        if (post_created) {
            return {
                message: 'Post created successfully',
                status: 200,
                result: post_created
            }
        }
    },

    
    post_update: async (parent: any, { postId, post }: any, { prisma, userInfo }) => {
        if (post === undefined || post === null) {
            return {
                message: 'Nothing for update',
                status: 400,
                result: null
            }
        }
        const isExist = await prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        })
        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }

        const post_updated = await prisma.post.update({
            where: {
                id: Number(postId),
                userId: userInfo.userId
            },
            data: {
                ...post
            }
        })

        if (post_updated) {
            return {
                message: 'post updated successfully',
                status: 200,
                result: post_updated
            }
        }
    },


    post_delete: async (parent: any, { postId }: any, { prisma, userInfo }) => {
        console.log(postId)

        const isExist = await prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        })
        if (!isExist) {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }

        const post_deleted = await prisma.post.delete({
            where: {
                id: Number(postId)
            }
        })

        if (post_deleted) {
            return {
                message: 'post deleted successfully',
                status: 200,
                result: post_deleted
            }
        }
    },


    post_publish: async (parent: any, { postId, post }: any, { prisma, userInfo }) => {

        const isExist = await prisma.post.findFirst({
            where: {
                id: Number(postId)
            }
        })

        if (!isExist) {
            return {
                message: 'This post does not exist',
                status: 400,
                result: null
            }
        }

        const isAuthorized = await prisma.user.findFirst({
            where: {
                id: Number(userInfo.userId)
            }
        })

        if (isAuthorized.role != 'ADMIN') {
            return {
                message: 'Unauthorized access',
                status: 400,
                result: null
            }
        }

        const post_published = await prisma.post.update({
            where: {
                id: Number(postId)
            },
            data: {
                ...post
            }
        })

        if (post_published.published === true) {
            return {
                message: 'Post published successfully',
                status: 200,
                result: post_published
            }
        } else if (post_published.published === false) {
            return {
                message: 'Post unpublished successfully',
                status: 200,
                result: post_published
            }
        }

    }
}