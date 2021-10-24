import { Field, ID, ObjectType } from "type-graphql"
import { MaxLength } from "class-validator"

@ObjectType()
export class User {
    @Field(type => ID)
    id!: number

    @Field({
      nullable: false
    })
    userId!: string;

    @Field({
      nullable: false
    })
    email!: string;

    @Field({
      nullable: false
    })
    givenName!: string;

    @Field({
      nullable: true
    })
    imageUrl!: string;

    @Field({
      nullable: false
    })
    name!: string;

    @Field({
      defaultValue: Date.now()
    })
    createdAt!: Date;

    @Field({
      defaultValue: Date.now()
    })
    updatedAt!: Date;

    @Field({
      defaultValue: false
    })
    isLoggedIn!: boolean;

    @Field({
      nullable: true
    })
    phone?: string;

    @Field({
      nullable: true,
      defaultValue: ""
    })
    @MaxLength(255)
    bio?: string;

    @Field({
      nullable: true
    })
    @MaxLength(255)
    address?: string;
}

@ObjectType()
export class Signup_Return {
    @Field({
      nullable: true
    })
    authToken?: string;

    @Field({
      nullable: true
    })
    isLoggedIn?: boolean;

    @Field({
      nullable: true
    })
    userId?: string;

    @Field({
      defaultValue: "no error"
    })
    error?: string;
}
