export class Environment {
    variables(): EnvironmentVariables;
}

export interface EnvironmentVariables {
  dynamoTable: string
}