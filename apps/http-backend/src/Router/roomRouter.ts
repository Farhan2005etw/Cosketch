import { CreateRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

export const roomRouter : any = Router()

roomRouter.post('/create-room', authMiddleware, async (req : Request<{}>, res : Response<{}>) => {
    const data = CreateRoomSchema.safeParse(req.body)

    if(!data.success) {
        res.json({
            message : "Incorrect Inputs"
        })
        return
    }

    const userId : number | undefined = req.userId

    if(!userId) return
    console.log(userId)
    
   const room = await prisma.room.create({
        data : {
            adminId : userId,
            slug : data.data.name
        }
    })

    res.json({
        room  
    })
})