import { faker } from "@faker-js/faker";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { Project } from "ts-morph";
import { fakeInterface } from "./fakeInterface";
import { defaultOptions, Options } from "./Options";

const testData = join(dirname(__dirname), "test-data");

describe("fakeInterface", () => {
  test("coverage", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const source = project.createSourceFile("index.ts", readFileSync(join(testData, "test.ts"), { encoding: "utf8" }));
    const node = source.getInterfaceOrThrow("Profile");
    faker.seed(42);
    const warning = jest.fn(/* (message) => console.log(message) */);
    const options: Options = {
      ...defaultOptions,
      arrayLengthMinimum: 2,
      optionalRatio: 0.5,
      referenceDate: new Date("2022-08-18T00:00:00Z"),
      warning,
    };
    const obj = fakeInterface({ node, options });
    expect(obj).toMatchSnapshot();
    expect(warning).toHaveBeenCalledWith("Unhandled type unknown for alwaysUnknown");
    expect(warning).toHaveBeenCalledWith("Unhandled FunctionType declaration for fn");
  });
});
