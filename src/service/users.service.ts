import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { Encrypt } from "../helpers/encrypt.helper";

export class userService {
  constructor(private userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }
  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
  async createUser(user: User): Promise<User> {
    const payload = {
      ...user,
      password: await Encrypt.hashPassword(user.password),
    };
    const newuser = this.userRepository.create(payload);
    return await this.userRepository.save(newuser);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }
    this.userRepository.merge(user, userData);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.userRepository.delete({ id });
    if (user.affected === 0) {
      return false;
    }
    return true;
  }
}
