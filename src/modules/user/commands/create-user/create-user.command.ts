import { Command, CommandProps } from '../../../../libs/ddd';

export class CreateUserCommand extends Command {
  readonly name: string;

  readonly email: string;

  readonly country: string;

  readonly postalCode: string;

  readonly street: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.country = props.country;
    this.postalCode = props.postalCode;
    this.street = props.street;
  }
}
