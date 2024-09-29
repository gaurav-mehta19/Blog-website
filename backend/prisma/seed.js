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
                create:[{
                    title:"this is unni first blog title",
                    content:"this is the content of my first blog of unni",
                    published:true,
                },{
                    title:"this is gaurav second blog title.this is gaurav second blog title.this is gaurav second blog title",
                    content:"this is the content of my second blog of unni.this is the content of my second blog of unni.this is the content of my second blog of unni.this is the content of my second blog of unni.this is the content of my second blog of unni.this is the content of my second blog of unni.",
                    published:true,
                },{
                    title:"this is unni third blog title",
                    content:"this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unnithis is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.this is the content of my third blog of unni.",
                    published:true,
                }]
            }
        }
    })    

    const gaurav = await prisma.user.upsert({
        where:{ email:"gaurav@gmail.com"},
        update:{},
        create:{
            email:"gaurav@gmail.com",
            password:"123456789",
            name:"gaurav",
            description:"this is gaurav",

            blogs:{
                create:[{
                    title:"this is gaurav first blog title",
                    content:"this is the content of my first blog of gaurav",
                    published:true,
                },{
                    title:"this is gaurav second blog title",
                    content:"this is the content of my second blog of gaurav",
                    published:true,
                }]
            }

        }

    })
}

main().then(async()=>{
    await prisma.$disconnect()
})

.catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
})