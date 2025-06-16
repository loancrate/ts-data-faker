import { faker } from "@faker-js/faker";
import { TypeElementMemberedNode } from "ts-morph";
import { fakeProperty } from "./fakeProperty";
import { ObjectContext } from "./ObjectContext";
import { Options } from "./Options";

export function fakeTypeElementMemberedNode(params: {
  node: TypeElementMemberedNode;
  propertyPath: string[];
  targetObject: Record<string, any>;
  objectContext: ObjectContext;
  options: Options;
}): Record<string, unknown> {
  const { node, propertyPath, targetObject, objectContext, options } = params;
  for (const property of node.getProperties()) {
    const { name, hasQuestionToken } = property.getStructure();
    if (name in targetObject) {
      continue;
    }
    if (hasQuestionToken && random() > options.optionalRatio) {
      continue;
    }
    const type = property.getType();
    const value = fakeProperty({ type, name, objectContext, propertyPath: propertyPath.concat(name), options });
    if (value !== undefined) {
      targetObject[name] = value;
    }
  }
  return targetObject;
}

function random(): number {
  return faker.number.float({ min: 0, max: 1, fractionDigits: 4 });
}
