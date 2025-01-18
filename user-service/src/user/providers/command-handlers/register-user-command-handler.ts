import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { RegisterUserCommand } from "src/user/models/commands/register-user-command";
import { InjectModel } from "@nestjs/mongoose";
import { UserSchemaName } from "src/user/models/schemas/user.schema";
import { UserModel } from "src/user/models/user.model";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';


@Injectable()
@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(
        @InjectModel(UserSchemaName)
        private userService: Model<UserModel>
    ){}
    async execute(command: RegisterUserCommand): Promise<boolean> {
        const { firstname,lastname, email, password } = command;
        try{
            const existingUser = await this.userService.findOne({email});
            if(existingUser){
                throw new BadRequestException(`User Already exists`);
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new this.userService({
                firstname,
                lastname,
                email,
                password: hashedPassword,
            });
            await newUser.save();
            Logger.log('User created successfully', 'RegisterUserCommandHandler');
            return true;
        }catch(error){
            Logger.error('Error Ocuured while creating a new user',error);
            throw new Error('Error creating a new user')
            // return false;
        }
    }
}