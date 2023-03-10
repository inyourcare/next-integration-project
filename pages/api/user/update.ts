import type { NextApiRequest, NextApiResponse } from "next";
import { logger } from "@core/logger";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        await handlePOST(req, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}

// POST /api/user
async function handlePOST(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    logger.debug("updating user", {
        ...req.body,
    });
    // await prisma.user.updateMany({
    //     data: {
    //         role
    //     }
    // })
    // const user = await prisma.user.create({
    //     data: { ...req.body, password: hashPassword(req.body.password), role: Role.USER },
    // });
    // res.json(user);
}
