import { PrismaClient } from '@prisma/client'
import { ROLE } from './types'
const prisma = new PrismaClient()
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'admin@sotong.kr',
            name: 'Admin',
            // posts: {
            //     create: {
            //         title: 'Check out Prisma with Next.js',
            //         content: 'https://www.prisma.io/nextjs',
            //         published: true,
            //     },
            // },
            roles: {
                create: {
                    role: ROLE.ADMIN
                }
            }
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'user@sotong.kr',
            name: 'User',
            // posts: {
            //     create: [
            //         {
            //             title: 'Follow Prisma on Twitter',
            //             content: 'https://twitter.com/prisma',
            //             published: true,
            //         },
            //         {
            //             title: 'Follow Nexus on Twitter',
            //             content: 'https://twitter.com/nexusgql',
            //             published: true,
            //         },
            //     ],
            // },
            roles: {
                create: {
                    role: ROLE.USER
                }
            }
        },
    })
    console.log({ alice, bob })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })