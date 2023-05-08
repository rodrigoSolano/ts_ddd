import { Err, Ok, Result } from 'oxide.ts';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { CommandHandler } from '../../../../libs/core/command-bus/command-handler.decorator';
import { Inject } from 'typedi';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { NotFoundException } from '../../../../libs/exceptions';
import { Command, CommandProps } from '../../../../libs/ddd';

export class DeleteUserCommand extends Command {
  readonly userId: string;

  constructor(props: CommandProps<DeleteUserCommand>) {
    super(props);
    this.userId = props.userId;
  }
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(
    command: DeleteUserCommand,
  ): Promise<Result<boolean, NotFoundException>> {
    const found = await this.userRepo.findOneById(command.userId);
    if (found.isNone()) return Err(new NotFoundException());
    const user = found.unwrap();
    user.delete();
    const result = await this.userRepo.delete(user);
    return Ok(result);
  }
}
