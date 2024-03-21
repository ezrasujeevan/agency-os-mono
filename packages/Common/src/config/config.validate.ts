import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariables } from './config.sheme';

// export function validate(config: Record<string, unknown>) {
//   const validatedConfig = plainToInstance(EnvironmentVariables, config, {
//     enableImplicitConversion: true,
//   });
//   const errors = validateSync(validatedConfig, {
//     skipMissingProperties: false,
//   });

//   if (errors.length > 0) {
//     throw new Error(errors.toString());
//   }
//   return validatedConfig;
// }

export const validateEnv = (
  config: Record<string, unknown>,
): EnvironmentVariables => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
