import { EventEmitter2 } from 'eventemitter2';
import { Service } from 'typedi';

@Service()
export class EventEmmiter extends EventEmitter2 {
  constructor() {
    super();
  }
}
