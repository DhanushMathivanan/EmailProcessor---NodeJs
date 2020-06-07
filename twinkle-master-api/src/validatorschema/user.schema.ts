import * as joi from 'joi';

export class UserSchema {
    public GetUserRequest () {
        return joi.object({
            email: joi.string(),
            active: joi.boolean(),
            isWeb: joi.boolean()
        });
    }

    public SendUserEmail () {
        return joi.object({
            email: joi.string(),
            active: joi.boolean(),
            isWeb: joi.boolean()
        });
    }
}
