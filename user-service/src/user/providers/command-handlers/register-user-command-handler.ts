import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { RegisterUserCommand } from "src/user/models/commands/register-user-command";

@Injectable()
@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    async execute(command: RegisterUserCommand): Promise<boolean> {
        
        return true;
    }
}