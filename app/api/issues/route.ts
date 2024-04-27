import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const createIsssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
})


export async function POST(request: NextRequest) {
    const body = await request.json();
    const zodValidate = createIsssueSchema.safeParse(body);
    if(!zodValidate.success) {
        return NextResponse.json({error: zodValidate.error.errors}, {status: 400});
    }

    const createNewIssue = await prisma.issue.create({
        data: {
            title: zodValidate.data.title,
            description: zodValidate.data.description
        }
    }) 
return NextResponse.json(createNewIssue, {status: 201});
}