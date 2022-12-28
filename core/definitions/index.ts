import { User } from "@prisma/client"
import { getUsersColumns } from './columns'

export const viewWithThreshholds = {
    PC: 768,
    PAD: 360,
    MOBILE: 0
}

export const Querys = {
    getUserList: {
        key: 'userList',
        query: () => getUsers(),
        columns: getUsersColumns,
    }
}

const getUsers = async (): Promise<{ users: User[], pages: number }> =>
    await fetch(`${process.env.NEXTAPI_BASE_URL || '/api'}/user/list`, {
        method: 'POST',
        body: JSON.stringify({
            page: 0,
            limit: 1000,
            // conditions: {
            // creator: {
            // email: 'admin@sotong.co.kr'
            // email
            //     ...(email && { email: email })
            // }
            // }
            // conditions
            conditions: {}
        }),
        headers: { "Content-Type": "application/json" }
    }).then((result) => result.json())