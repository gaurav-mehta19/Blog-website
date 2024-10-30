import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlogInput } from '@gaurav_mehta/medium-common/dist/zod/zod';
import { getCookie } from "hono/cookie";
import { use } from "hono/jsx";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const token = await getCookie(c, "token");

    if (!token) {
        c.status(405);
        return c.json({ error : 'Unauthorized' });
    }
    try {
        const userData = await verify(token, c.env.JWT_SECRET);
        if (userData && typeof userData.id === 'string') {
            c.set('userId', userData.id);
            await next();
        } else {
            c.status(500);
            return c.json({ error : "You are not logged in" });
        }
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ error : "You are not logged in" });
    }
});

blogRouter.post('/', async (c) => {
    const body = await c.req.text()
    const parsedBody = JSON.parse(body);
    const { success } = createBlogInput.safeParse(parsedBody);
    const { title, content , firstImgUrl } = parsedBody;
    
    if (!success) {
        c.status(400);
        return c.json({
            error : "Inputs incorrect "
        })
    }
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.blog.create({
            data: {
                title: title,
                content: content,
                authorId: userId,
                image:firstImgUrl,
            }
        })
    
        return c.json({
            id: blog.id,
            userId: blog.authorId
        })
    }catch(e){
        c.status(500);
        return c.json({ error : "Internal Server Error" });
    
}
})

// blogRouter.put('/', async (c) => {
//     const body = await c.req.text()
//     const parsedBody = JSON.parse(body);
//     const { success } = updateBlogInput.safeParse(parsedBody)
//     const { id, title, content } = parsedBody;
//     if (!success) {
//         c.status(400);
//         return c.json({
//             error: "Inputs incorrect "
//         })
//     }

//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate())

//     const blog = await prisma.blog.update({
//         where: {
//             id: id
//         },
//         data: {
//             title: title,
//             content: content,
//         }
//     })

//     return c.json({
//         id: blog.id
//     })
// })

blogRouter.delete('/:id', async (c) => {
    const id = await c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
       await prisma.blog.delete({
            where:{
                id:id
            }
        })

        return c.json({
            msg: "Blog Deleted"
        })
    }catch(e){
        c.status(500);
        return c.json({ error : "Internal Server Error" });
    }
})


blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const blogs = await prisma.blog.findMany({
        take: 20,
        select: {
         content: true,
          title: true,
          id: true,
          publishDate: true,
         image: true,
          author: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      });
      
      return c.json({ blogs });
    } catch (e) {
      c.status(500)
      return c.json({ error: "Internal Server Error" });
    }
  });
  

blogRouter.get('/myblogs/:userId', async (c) => {
    const userId = await c.req.param('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const myblogs = await prisma.blog.findMany({
            where: {
                authorId: userId
            },
            select: {
                content: true,
                title: true,
                id: true,
                publishDate: true,
                image: true,
                author: {
                    select: {
                        name: true,
                        description: true
                    }
                }

            }
        })

        return c.json({
            myblogs
        })
    }
    catch (e) {
        c.status(500);
        return c.json({ error: "Internal Server error" })
    }

})

blogRouter.get('/:id', async (c) => {
    const id = await c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishDate: true,
                image: true,
                author: {
                    select: {
                        name: true,
                        description: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    }
    catch (e) {
        c.status(500);
        return c.json({ error: "Internal Server error" })
    }

})

