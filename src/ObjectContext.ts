import { Memoize } from "typescript-memoize";
import { NameGenerator } from "./NameGenerator.js";

export class ObjectContext {
  @Memoize()
  get nameGenerator(): NameGenerator {
    return new NameGenerator();
  }
}
