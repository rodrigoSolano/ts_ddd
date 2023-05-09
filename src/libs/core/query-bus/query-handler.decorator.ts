/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Container, { Service } from 'typedi';
import { QueryBus } from './query-bus';

export function QueryHandler(queryClass: any) {
  return function (target: any): void {
    Service()(target); // registramos la clase como un servicio de typedi
    const queryBus = Container.get(QueryBus);
    const handlerInstance = Container.get(target); // resolvemos las dependencias del handler con typedi
    queryBus.registerHandler(queryClass, handlerInstance);
  };
}
