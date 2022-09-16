import express from 'express';
import cors from 'cors'; //protege contra fron-ends que não queremos que acessem o back-end
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';
const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
})

//rota para listagem de games 
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })
    return response.json(games);
});

//rota para criação de anúncio
app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            YearsPlaying: body.YearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),            
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad);
});

//listagem de anúncios por game -> /game/2/ads
app.get('/games/:id/ads', async (request, response) => { //localhost:3333/ads
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: { //retirando o discord do select, para só mostrar dps
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            YearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId, //gameId: gameId
        },
        orderBy: {
            createdAt: 'desc' //anúncios mais recentes vem primeiro
        }
    })
    return response.json(ads.map(ad => { //formatando a saída dos valores
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    })) 
})

//buscar discord pelo ID do anúncio
app.get('/ads/:id/discord', async (request, response) => { //localhost:3333/ads
    const adId = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({ //irá procurar um ad com o id passado, caso não encontre retorna um erro
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })
    return response.json({
        discord: ad.discord,
    })
})

app.listen(3333)