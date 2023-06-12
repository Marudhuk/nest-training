import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { log } from 'console';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  async signUp(@Req() req: Request, @Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);

      res.status(HttpStatus.OK).json(
        {
          message: "Successfully Added User"
        });
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error in adding user"
        
      });
    }
  }

  @Get('getAll')
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const users = await this.userService.findAll();

      res.status(HttpStatus.OK).json(
        {
          message: "Successfully fetched Users",
          data: users
        });

    } catch (e) {
      console.log(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        message: "Unable to Fetch Users" 
      });
    }
  }

  @Get('getUser/:id')
  async getUser(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    try {

      let user = await this.userService.findOne(id);

      res.status(HttpStatus.OK).json({ 
        message: "Successfully fetched User", 
        data: user 
      });

    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        message: "Unable to Fetch User" 
      });
    }
  }

  @Put('updateUser/:id')
  async updateUser(@Req() req: Request, @Res() res: Response,@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try{
      await this.userService.update(id, updateUserDto);
      res.status(HttpStatus.OK).json({
        message:"Successfully updated user"
      })

    }catch(err){
      console.log(err,"update");
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"Could not update"
      })
    }
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Req() req: Request, @Res() res: Response,@Param('id') id: number) {
    try{
      await this.userService.delete(id);
      res.status(HttpStatus.OK).json({
        message:"Deleted user successfully"
      })
    }catch(err){
      console.log(err,'delete user failed');
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:"Could not delete user"
      })
    }
  }
}
