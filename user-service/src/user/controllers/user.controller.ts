import { Controller,Body,Post,Get } from '@nestjs/common';
import {QueryBus,CommandBus} from '@nestjs/cqrs';
import { UserService } from '../user.service';


@Controller()
export class UserController {
    constructor(private UserService: UserService){}
   

}
