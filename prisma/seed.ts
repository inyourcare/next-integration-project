// import { hashPassword } from '@core/password'
import sha256 from "crypto-js/sha256";
import { PrismaClient } from '@prisma/client'
import { ROLE } from './types'
const hashPassword = (password: string) => {
    return sha256(password).toString();
};
const prisma = new PrismaClient()
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'admin@sotong.kr' },
        update: {},
        create: {
            email: 'admin@sotong.kr',
            name: 'Admin',
            password: hashPassword('pass12#$'),
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
        where: { email: 'user@sotong.kr' },
        update: {},
        create: {
            email: 'user@sotong.kr',
            name: 'User',
            password: hashPassword('pass12#$'),
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