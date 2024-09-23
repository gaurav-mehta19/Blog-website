import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const unni = await prisma.user.upsert({
        where:{ email:"unni@gmail.com"},
        update:{},
        create:{
            email:"unni@gmail.com",
            password:"123456789",
            name:"unni",
            description:"this is unni",

            blogs:{
                create:{
                    title:"this is my first blog title",
                    content:"this is the content of my first blog",
                    published:true,
                }
            }
        }
    })

    console.log(unni);
    
}

main().then(async()=>{
    await prisma.$disconnect()
})

.catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
})