/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Container, { Service } from 'typedi';
import { EventEmmiter } from './event-emmiter';

// Ejemplo de uso:
// @OnEvent(UserCreatedDomainEvent.name, { async: true, promisify: true })
export function OnEvent(eventName: string) {
  return function (target: any, propertyKey: string) {
    // obtenemos el constructor de la clase que contiene el método decorado
    const constructor = target.constructor;
    // registramos la clase como un servicio de typedi
    Service()(constructor);
    // obtenemos la instancia de la clase EventEmmiter
    const eventEmmiter = Container.get(EventEmmiter);
    // obtenemos la instancia de la clase que contiene el método decorado
    const instance = Container.get(constructor);
    // registramos el evento en el event emmiter
    eventEmmiter.on(eventName, (...args: any[]) => {
      // ejecutamos el método decorado
      instance[propertyKey](...args);
    });
  };
}
