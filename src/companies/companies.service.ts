import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    return await this.companyModel.create({
      name: createCompanyDto.name,
      address: createCompanyDto.address,
      description: createCompanyDto.description,
      createdBy: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.companyModel.updateOne(
      {
        _id: updateCompanyDto._id,
      },
      {
        name: updateCompanyDto.name,
        address: updateCompanyDto.address,
        description: updateCompanyDto.description,
        updatedBy: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
