export * as UserProto from './user';
export const userProtoFile = './user.proto';
export * as ClientProto from './client';
export const clientProtoFile = './client.proto';
// export * as CompanyProto from './company';
// export const companyProtoFile = './company.proto';


// "pre:build": "pnpm pre:build:user && pnpm pre:build:client && pnpm pre:build:company",
    // "pre:build:user": "protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out ./ --ts_proto_opt=nestJs=true ./src/user.proto --experimental_allow_proto3_optional",
    // "pre:build:client": "protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out ./ --ts_proto_opt=nestJs=true ./src/client.proto --experimental_allow_proto3_optional",
    // "pre:build:company": "protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out ./ --ts_proto_opt=nestJs=true ./src/compnay.proto --experimental_allow_proto3_optional",
    // "pre:build:all": "protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out ./ --ts_proto_opt=nestJs=true ./src/*.proto --experimental_allow_proto3_optional",