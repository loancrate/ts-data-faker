import { faker } from "@faker-js/faker";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { Project } from "ts-morph";
import { fakeInterface } from "./fakeInterface.js";
import { defaultOptions } from "./Options.js";

const testData = join(dirname(__dirname), "test-data");

describe("fakeInterface", () => {
  test("coverage", () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const source = project.createSourceFile("index.ts", readFileSync(join(testData, "test.ts"), { encoding: "utf8" }));
    const node = source.getInterfaceOrThrow("Profile");
    faker.seed(42);
    const warning = jest.fn(/* (message) => console.log(message) */);
    const options = { ...defaultOptions, optionalRatio: 0.5, referenceDate: new Date("2022-08-18T00:00:00Z"), warning };
    const obj = fakeInterface({ node, options });
    // console.log(JSON.stringify(obj, undefined, 2));
    expect(obj).toStrictEqual(JSON.parse(readFileSync(join(testData, "test.json"), { encoding: "utf8" })));
    expect(warning).toBeCalledWith("Unhandled type unknown for alwaysUnknown");
    expect(warning).toBeCalledWith("Unhandled FunctionType declaration for fn");
  });
});
