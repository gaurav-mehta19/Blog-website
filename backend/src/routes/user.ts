import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { signupInput, signinInput } from '@gaurav_mehta/medium-common/dist/zod/zod';
import bcrypt from 'bcryptjs';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "Inputs incorrect" });
  }

  const existingUser = await prisma.user.findFirst({
    where: { email: body.email }
  });

  if (existingUser) {
    c.status(400);
    return c.json({ error: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
        description: body.description
      }
    });

    const token = await sign({ id: user.id, name: user.name, email: user.email, description: user.description }, c.env.JWT_SECRET);
    
    // Securely set cookie with added security options
    setCookie(c, 'token', token, {
      httpOnly: true,
      secure: true, // Ensures cookie is sent only over HTTPS
      sameSite: 'None' ,  // Helps mitigate CSRF attacks
      maxAge: 60 * 60 * 24 * 7 // Sets cookie to expire in 1 week
    });
    
    return c.json({ token });
  } catch (e) {
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ error: "Inputs incorrect" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email }
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      c.status(403);
      return c.json({ error: "Invalid password" });
    }

    const token = await sign({ id: user.id, name: user.name, email: user.email, description: user.description }, c.env.JWT_SECRET);

    // Securely set cookie with added security options
    setCookie(c, 'token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return c.json({ token });
  } catch (e) {
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

userRouter.get('/profile', async (c) => {
  const token = await getCookie(c, 'token');

  if (!token) {
    c.status(405);
    return c.json({ error: 'Unauthorized' });
  }

  try {
    const userData = await verify(token, c.env.JWT_SECRET);
    return c.json({ profile: userData as Record<string, any> });
  } catch (e) {
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

userRouter.post('/signout', async (c) => {
  try {
    deleteCookie(c, 'token', {
      path: '/',
      httpOnly: true,
      secure: true, // Must match the cookie settings
      sameSite: 'None',
    });
    return c.json({ message: "Logged out" });
  } catch (e) {
    c.status(500);
    return c.json({ error: "Invalid" });
  }
});
