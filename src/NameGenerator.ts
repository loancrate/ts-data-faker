import { faker } from "@faker-js/faker";
import { Memoize } from "typescript-memoize";

export class NameGenerator {
  readonly firstName: string;
  readonly lastName: string;

  constructor() {
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
  }

  @Memoize()
  get middleName(): string {
    return faker.name.middleName();
  }

  @Memoize()
  get suffix(): string {
    return faker.name.suffix();
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Memoize()
  get userName(): string {
    return faker.internet.userName(this.firstName, this.lastName);
  }

  @Memoize()
  get email(): string {
    return faker.internet.email(this.firstName, this.lastName);
  }
}
