import { z } from 'zod'

export const ImageDataSchema = z.object({
  id: z.string(),
  author: z.string(),
  download_url: z.url(),
  width: z.number(),
  height: z.number(),
})

export const ImageDataArraySchema = z.array(ImageDataSchema)

export type ImageSchema = z.infer<typeof ImageDataSchema>
