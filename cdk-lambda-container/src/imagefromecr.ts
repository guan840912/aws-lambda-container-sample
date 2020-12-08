import * as ecr from '@aws-cdk/aws-ecr';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
export class MyStackCode extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);
    const repo = ecr.Repository.fromRepositoryName(this, 'myrepo', 'lambda/python3.8');
    new lambda.Function(this, 'Fn', {
      code: lambda.Code.fromEcrImage(repo, {
        cmd: ['app.handler'],
        tag: '3.9-alpine-betav5',
        entrypoint: ['/entry.sh']
      }),
      handler: lambda.Handler.FROM_IMAGE,
      runtime: lambda.Runtime.FROM_IMAGE,
    });
  }
}