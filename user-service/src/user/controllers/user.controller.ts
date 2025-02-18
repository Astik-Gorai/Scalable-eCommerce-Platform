import { Controller,Body,Post,Get,Param,Query } from '@nestjs/common';
import {QueryBus,CommandBus} from '@nestjs/cqrs';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { RegisterUserCommand } from '../models/commands/register-user-command';
import { LoginUserCommand } from '../models/commands/login-user-command';
import { GetUserProfileQuery } from '../models/queries/get-user-profile.query';


@Controller()
export class UserController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus){}
   
    @Post('/register')
    async createUser(
        @Body() user: UserModel
    ):Promise<boolean>{
        console.log(user);
        return this.commandBus.execute(new RegisterUserCommand(user.firstname,user.lastname,user.email,user.password))
    }
    
    @Post('/login')
    async verifyMe(
        @Body() user: UserModel
    ):Promise<boolean>{
        return this.commandBus.execute(new LoginUserCommand(user.email,user.password))
    }

    @Get('/user')
    @Get('/user')
    async getData(@Query('email') email: string) {
    console.log(email); // Now it will print the email correctly
    return this.queryBus.execute(new GetUserProfileQuery(email));
}
    @Get('/hi')
    funs(){
        return 'Hello From Astik!'
    }


}
