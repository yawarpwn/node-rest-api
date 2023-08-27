import z from 'zod'

export const quotationSchema = z
  .object({
    company: z.string(),
    ruc: z.string().length(11),
    quo_number: z.number().int(),
    date: z.coerce.date(),
  })
  .required()

export const validateQuotation = (obj) => {
  return quotationSchema.safeParse(obj)
}

export const validatePartialQuotation = (obj) => {
  return quotationSchema.partial().safeParse(obj) 
}

