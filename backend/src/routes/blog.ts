import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@gaurav_mehta/medium-common";
import sanitizeHtml from 'sanitize-html';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId:string
    }
}>();

blogRouter.use('/*',async(c,next)=>{
    const authHeader = c.req.header('Authorization') || "";
    try{
        const user = await verify(authHeader,c.env.JWT_SECRET)
        if(user){
            if(typeof user.id == 'string'){
                c.set('userId',user.id)
                await next()
            }
        }else{
            return c.json({
                message:"you are not logged in"
            })
        }
    }
    catch(e){
        c.status(411);
        return c.json({error:"you are not logged in"})
    }
   
})

blogRouter.post('/', async(c) => {
    const body = await c.req.text()
    const parsedBody = JSON.parse(body);
    const { success } = createBlogInput.safeParse(parsedBody);
    const { title, content } = parsedBody;
    if(!success){
        c.status(411);
        return c.json({
            msg:"Inputs incorrect "
        })
    }
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogContent = sanitizeHtml(content)
    
    const blog = await prisma.blog.create({
        data: {
            title:title,
            content:blogContent,
            published:true,
            authorId: userId
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRouter.put('/', async(c) => {
    const body = await c.req.text()
    const parsedBody = JSON.parse(body);
    const { success } = updateBlogInput.safeParse(parsedBody)
    const { id, title, content } = parsedBody;
    if(!success){
        c.status(411);
        return c.json({
            msg:"Inputs incorrect "
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id:id
        },
        data: {
            title:title,
            content:content,
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            publishDate:true,
            author:{
                select:{
                    name:true
                }
            }

        }
    })

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async(c) => {
    const id = await c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id:id
            },
            select:{
                id:true,
                title:true,
                content:true,
                publishDate:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
    
        return c.json({
            blog
        })
    }
    catch(e){
        c.status(411);
      return c.json({error:"Invalid"})
    }

})

