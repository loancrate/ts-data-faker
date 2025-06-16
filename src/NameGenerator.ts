import { faker } from "@faker-js/faker";
import { Memoize } from "typescript-memoize";

export class NameGenerator {
  readonly firstName: string;
  readonly lastName: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
  }

  @Memoize()
  get middleName(): string {
    return faker.person.middleName();
  }

  @Memoize()
  get suffix(): string {
    return faker.person.suffix();
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Memoize()
  get userName(): string {
    return faker.internet.username({ firstName: this.firstName, lastName: this.lastName });
  }

  @Memoize()
  get email(): string {
    return faker.internet.email({ firstName: this.firstName, lastName: this.lastName });
  }
}
