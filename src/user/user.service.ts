import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find({
      select :['id','name','email','isActive'],
      // where:{isActive:true}
    }); ;
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({where : {id}}); 
    // return await this.userRepository.createQueryBuilder('u')
    // .select('u.name, u.email')
    // .where('u.id = :id', {id})
    // .getRawOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
     await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
     await this.userRepository.softDelete(id);
     await this.userRepository.update(id,{isActive: false});
  }
}
