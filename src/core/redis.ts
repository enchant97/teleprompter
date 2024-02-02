import { type RedisClientType, createClient } from "redis";
import { RemoteCommand } from "./types";

let publisher: RedisClientType | undefined
let subscriber: RedisClientType | undefined

process.on("beforeExit", async () => {
  await publisher?.disconnect()
  await subscriber?.disconnect()
})

async function setupClient(): Promise<RedisClientType> {
  let client = createClient({ url: process.env.REDIS_URI })
  client.on("error", err => console.log("Redis Client Error", err))
  await client.connect()
  // @ts-ignore
  return client
}

async function getPublisher() {
  if (publisher) { return publisher }
  publisher = await setupClient()
  return publisher
}

async function getSubscriber() {
  if (subscriber) { return subscriber }
  subscriber = await setupClient()
  return subscriber
}

export async function publishCommand(clientUid: string, command: RemoteCommand) {
  let client = await getPublisher()
  await client.publish(`commands:${clientUid}`, JSON.stringify(command))
}

export async function hasSubscibers(clientUid: string): Promise<boolean> {
  let client = await getPublisher()
  return (await client.pubSubNumSub(`commands:${clientUid}`))[`commands:${clientUid}`] !== 0
}

export async function subscribeForCommands(clientUid: string, onCommand: (c: RemoteCommand) => any, abortSignal: AbortSignal) {
  let client = await getSubscriber()
  await client.subscribe(`commands:${clientUid}`, (message) => {
    onCommand(JSON.parse(message))
  })
  abortSignal.addEventListener("abort", async () => client.unsubscribe(`commands:${clientUid}`))
}
