import { nanoid } from 'nanoid'

import { pusherServer } from '~/lib/pusher'

export async function POST(req: Request) {
    const data = await req.text()
    const [socketId, channelName] = data
        .split('&')
        .map((str) => str.split('=')[1])

    if (!socketId || !channelName) {
        return new Response('Invalid request', { status: 400 })
    }

    const id = nanoid()

    const presenceData = {
        user_id: id,
        user_data: { user_id: id },
    }

    const auth = pusherServer.authorizeChannel(
        socketId,
        channelName,
        presenceData,
    )

    return new Response(JSON.stringify(auth))
}
