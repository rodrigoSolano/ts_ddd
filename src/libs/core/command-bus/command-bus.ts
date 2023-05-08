import 'reflect-metadata';
import { Service } from 'typedi';
import { Command } from '../../ddd';

export interface ICommandHandler<
  TCommand extends Command = any,
  TResult = any,
> {
  execute(command: TCommand): Promise<TResult>;
}

export interface ICommandBus<CommandBase extends Command = Command> {
  execute<T extends CommandBase, R = any>(command: T): Promise<R>;
}

@Service()
export class CommandBus implements ICommandBus<Command> {
  private handlers: Map<string, any> = new Map();

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  registerHandler(commandClass: any, handler: any): void {
    this.handlers.set(commandClass.name, handler);
  }

  async execute<T extends Command, R = any>(command: T): Promise<R> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) {
      throw new Error(
        `No handler registered for command ${command.constructor.name}`,
      );
    }
    return handler.execute(command) as R;
  }
}
