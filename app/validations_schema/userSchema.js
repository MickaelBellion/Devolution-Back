const Joi = require('joi')
            .extend(require('@joi/date'));

const userSchema = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr' ,'io']  }})
        .required()
        .lowercase(),


    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    pseudo: Joi.string()
        .min(3)
        .max(30)
        .required(),


    city: Joi.string(),


    description: Joi.string()
        .min(0)
        .max(700),

    user_function: Joi.string(),
        

    image_url: Joi.string()
        .min(3),
       


    lastname: Joi.string()
        .min(1)
        .max(30)
        .required(),

    firstname: Joi.string()
        .min(3)
        .max(30)
        .required(),

    phone: Joi.string()
        .min(8)
        .max(10),  

    role_id: Joi.number()
        .integer(),

    // access_token: [
    //     Joi.string(),
    //     Joi.number()
    // ],
    
})
.with('password', 'repeat_password')



module.exports= userSchema
