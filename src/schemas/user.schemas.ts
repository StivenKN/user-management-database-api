import Joi from 'joi'

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const userSchema = Joi.object({
  userEmail: Joi
    .string().email().required(),
  userPassword: Joi
    .string().pattern(passwordPattern).required(),
  userRole: Joi
    .number().required(),
  dbNameSpace: Joi
    .string().required()
})
