const Joi = require('joi')
            .extend(require('@joi/date'));



const projectSchema = Joi.object({
name: Joi.string()
.required(),
            
is_available: Joi.boolean()
.required(),
            
description: Joi.string(),
            
need_of_the_project: Joi.string(),
            
beginning_date: Joi.date()
.format('YYYY-MM-DD'),
            
icon: Joi.string(),

owner_id: Joi.number()
            
            });

module.exports=projectSchema