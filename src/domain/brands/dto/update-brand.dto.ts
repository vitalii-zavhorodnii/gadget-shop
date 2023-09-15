import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested
} from 'class-validator';

import { MetadataDto } from 'shared/metadata.dto';

export class UpdateBrandDto {
  @ApiProperty({
    example: 'Apple',
    description: 'Brand title'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 60, {
    message: 'title required to be 1-60 symbols length'
  })
  readonly title?: string;

  @ApiProperty({
    example: 'We repair Apple gadgets',
    description: 'Brand description'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    example: 'xiaomi',
    description: 'Brand URL'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly slug?: string;

  @ApiProperty({
    example: false,
    description: 'If false, will not appear on client side lists'
  })
  @IsOptional()
  @IsBoolean({ message: 'field must be a boolean' })
  readonly isActive?: boolean;

  @ApiProperty({
    example: 'Reparing Apple phones...',
    description: 'article'
  })
  @IsOptional()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly article?: string;

  @ApiProperty({
    type: MetadataDto
  })
  @IsOptional()
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MetadataDto)
  readonly metadata?: MetadataDto;

  readonly icon?: string;
}
