const BaseRoute = require('./base/baseRoute');
const Joi = require('@hapi/joi');
const Boom = require('boom');

//npm i jsonwebtoken
const Jwt = require('jsonwebtoken');

const failAction = (request, headers, error) => {
    throw error;
}
const USER = {
    username: 'xuxa',
    password: '123'
}

class authRoutes extends BaseRoute {
    constructor(secret){
        super();
        this.secret = secret;
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            options: {
                auth: false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'Faz login com username e senha do banco',
                validate: {
                    failAction,
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    })
                },
                handler: async (request) => {
                    const { username, password } = request.payload;

                    if(
                        username.toLowerCase() !== USER.username ||
                        password !== USER.password
                    ) return Boom.unauthorized();
                    
                    const token = Jwt.sign({
                        username: username,
                        id: 1
                    }, this.secret );

                    return {
                        token
                    }
                }
            }
        }
    }
}

module.exports = authRoutes;