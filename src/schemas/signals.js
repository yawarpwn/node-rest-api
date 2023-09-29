import z from 'zod'

export const signalSchema = z.object({
  title: z.string(),
  code: z.string(),
  category: z.enum([
    'obras',
    'viales',
    'decorativas',
    'fotoluminiscentes',
    'seguridad',
  ]),
})

export const validateSignal = (obj) => {
  return signalSchema.safeParse(obj)
}

export const validatePartialSignal = (obj) => {
  return signalSchema.partial().safeParse(obj)
}
