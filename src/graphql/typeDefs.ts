import { Field, ID, ObjectType } from "type-graphql"
import { MaxLength } from "class-validator"

@ObjectType()
export class User {
    @Field(type => ID)
    id!: number

    @Field({
      nullable: false
    })
    userId!: String;

    @Field({
      nullable: false
    })
    email!: String;

    @Field({
      nullable: false
    })
    given_name!: String;

    @Field({
      nullable: false
    })
    family_name!: String;

    @Field({
      nullable: false
    })
    nickname!: String;

    @Field({
      nullable: false
    })
    locale!: String;

    @Field({
      nullable: false
    })
    email_verified!: Boolean;

    @Field({
      nullable: true
    })
    picture!: String;

    @Field({
      nullable: false
    })
    name!: String;

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
    phone!: String;

    @Field({
      nullable: true,
      defaultValue: ""
    })
    @MaxLength(255)
    bio!: String;

    @Field({
      nullable: true
    })
    @MaxLength(255)
    address!: String;
}

@ObjectType()
export class Author {
  @Field()
  email!: String;

  @Field()
  firstname!: String;

  @Field()
  lastname!: String;

  @Field()
  fullname?: String;
}

@ObjectType()
export class Book {
  @Field()
  isbn!: String;

  @Field()
  title!: String;

  @Field()
  authors!: String;

  @Field()
  description!: String;
}

@ObjectType()
export class Mag {
  @Field()
  isbn!: String;

  @Field()
  title!: String;

  @Field()
  authors!: String;

  @Field()
  publishedAt!: String;
}

@ObjectType()
export class AllReturn {
  @Field()
  title!: String;

  @Field()
  isbn!: String;

  @Field()
  authors!: String;

  @Field()
  description_or_publishedAt!: String;
}

@ObjectType()
export class MyFiles {
  @Field(type => [String])
  myBooks!: String[];

  @Field(type => [String])
  myMagazines!: String[];
}

@ObjectType()
export class NewBookMagReturn {
  @Field(type => Boolean)
  status!: Boolean
}

@ObjectType()
export class DeleteBookMagReturn {
  @Field(type => Boolean)
  status!: Boolean
}

@ObjectType()
export class Signup_Return {
    @Field()
    userId!: String;
}
