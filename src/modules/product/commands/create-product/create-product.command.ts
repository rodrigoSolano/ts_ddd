import { Command, CommandProps } from '../../../../libs/ddd';

export class CreateProductCommand extends Command {
  readonly name: string;

  readonly description: string;

  readonly price: number;

  readonly stock: number;

  readonly image: string;

  constructor(props: CommandProps<CreateProductCommand>) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.stock = props.stock;
    this.image = props.image;
  }
}
