import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

import { cors } from 'hono/cors'



const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();

app.use('/api/*', cors({
	origin: ["https://blog-website-hlzm.vercel.app","http://localhost:5173"],
	credentials: true
}))

app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)

export default app
