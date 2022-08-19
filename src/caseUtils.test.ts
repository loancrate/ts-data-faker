import { splitCamelCase, lowerCaseInitial, upperCaseInitial, singularCamelCase } from "./caseUtils.js";

describe("splitCamelCase", () => {
  test("camelCaseIdentifier", () => {
    expect(splitCamelCase("camelCaseIdentifier")).toStrictEqual(["camel", "Case", "Identifier"]);
  });
  test("File1NotFoundTBA", () => {
    expect(splitCamelCase("File1NotFoundTBA")).toStrictEqual(["File1", "Not", "Found", "T", "B", "A"]);
  });
  test("empty string", () => {
    expect(splitCamelCase("")).toStrictEqual([""]);
  });
});

describe("lowerCaseInitial", () => {
  test("aaa", () => {
    expect(lowerCaseInitial("aaa")).toBe("aaa");
  });
  test("AAA", () => {
    expect(lowerCaseInitial("AAA")).toBe("aAA");
  });
  test("empty string", () => {
    expect(lowerCaseInitial("")).toBe("");
  });
});

describe("upperCaseInitial", () => {
  test("aaa", () => {
    expect(upperCaseInitial("aaa")).toBe("Aaa");
  });
  test("AAA", () => {
    expect(upperCaseInitial("AAA")).toBe("AAA");
  });
  test("empty string", () => {
    expect(upperCaseInitial("")).toBe("");
  });
});

describe("singularCamelCase", () => {
  test("camelCaseIdentifier", () => {
    expect(singularCamelCase("camelCaseIdentifier")).toBe("camelCaseIdentifier");
  });
  test("camelCaseIdentifiers", () => {
    expect(singularCamelCase("camelCaseIdentifiers")).toBe("camelCaseIdentifier");
  });
  test("empty string", () => {
    expect(singularCamelCase("")).toBe("");
  });
});
