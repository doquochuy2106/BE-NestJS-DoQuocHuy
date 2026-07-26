import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'address không được để trống' })
  address: string;

  @IsNotEmpty({ message: 'description không được để trống' })
  description: string;
}

export class UpdateCompanyDto {
  @IsNotEmpty({ message: 'Id không được để trống' })
  _id: string;

  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'address không được để trống' })
  address: string;

  @IsNotEmpty({ message: 'description không được để trống' })
  description: string;
}

export class DeleteCompanyDto {
  _id: string;
}
