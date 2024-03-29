import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export abstract class EnvironmentVariables {}

export const validateUtil = <T extends EnvironmentVariables>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<EnvironmentVariables>,
): T => {
  const validatedConfig = plainToInstance(envVariablesClass, config, {
    enableImplicitConversion: true,
  }) as T;
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
