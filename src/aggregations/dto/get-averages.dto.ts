import { IsEnum } from 'class-validator';
export enum Period {
  TEN = 10,
  THIRTY = 30,
  SIXTY = 60,
}

export class GetAveragesDto {
  @IsEnum(Period, {
    message: `Valid Periods are [${Object.keys(Period).filter(
      (_) => !isNaN(Number(_)),
    )}]`,
  })
  period: Period;
}
