import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationsSchema";
import prisma from "@/prisma/client";
import delay from "delay";



export async function PATCH(request: NextRequest, { params }: { params: { id: string}}) {

    const body = await request.json();

    const validation = issueSchema.safeParse(body)

    console.log("body",body)

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) {
        return NextResponse.json({error: "Invalid issue"}, {status: 400})
    }

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title: body.title,
            description: body.description,
            status: body.status
        }
    })

    return NextResponse.json(updatedIssue)
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string}}) {


    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    
    await delay(2000)

    if (!issue) {
        return NextResponse.json({error: "Invalid issue"}, {status: 400})
    }

    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    })

    return NextResponse.json({})
}