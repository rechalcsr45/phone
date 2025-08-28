import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { sign } from "crypto";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({massage: 'Method not allowed'});
    const { name, email, password, alamat} =  req.body;

    const existingUser = await prisma.user.findUnique({
        where:  {email},
    });

        if(existingUser){
            return res.status(409).json({massage : "User already exist"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                alamat,
            }
        });

        const token = jwt.sign({userId: newUser.id}, "YOUR_SECRET_KEY", {
           expiresIn: "1h", 
        });
        res.status(201).json({token});
    }
