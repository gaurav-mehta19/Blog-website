import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { getCookie, setCookie, deleteCookie, } from 'hono/cookie'
import { signupInput, signinInput } from '@gaurav_mehta/medium-common/dist/zod/zod';
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = signupInput.safeParse(body)

  console.log(body, success);


  if (!success) {
    c.status(400);
    return c.json({
      msg: "Inputs incorrect "
    })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
        description: body.description
      }
    })

    const token = await sign({ id: user.id,name:user.name,email:user.email,description:user.description }, c.env.JWT_SECRET)
    setCookie(c, "token", token)
    return c.json({ token })
  }
  catch (e) {
    c.status(500);
    return c.json({ error: "Invalid" })
  }
})


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body)

  if (!success) {
    c.status(400);
    return c.json({
      msg: "Inputs incorrect "
    })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const token = await sign({ id: user.id,name:user.name,email:user.email,description:user.description}, c.env.JWT_SECRET);
    setCookie(c, "token", token)
    return c.json({ token });
  }
  catch (e) {
    c.status(500);
    return c.json({ error: "Invalid" })
  }
})

userRouter.get('/profile', async (c) => {
  const token = await getCookie(c, "token")

  if (!token) {
    c.status(405)
    return c.json({ error: 'Unauthorized' })
  }
  try{
    const userData = await verify(token, c.env.JWT_SECRET)
    return c.json({ profile: userData as Record<string, any> })
  }catch(e){
    c.status(500);
    return c.json({ error: "Invalid" })
  }
})

userRouter.post('/signout', async (c) => {
  try{
    deleteCookie(c, "token")
    return c.json({ msg: "Logged out" })
  }catch(e){
    c.status(500);
    return c.json({ error: "Invalid" })
  }
})
