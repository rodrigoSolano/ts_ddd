/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Container, { Service } from 'typedi';
import { CommandBus } from './command-bus';

export function CommandHandler(commandClass: any) {
  return function (target: any): void {
    Service()(target); // registramos la clase como un servicio de typedi
    const commandBus = Container.get(CommandBus);
    const handlerInstance = Container.get(target); // resolvemos las dependencias del handler con typedi
    commandBus.registerHandler(commandClass, handlerInstance);
  };
}
