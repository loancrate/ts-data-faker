import { InterfaceDeclaration, Node } from "ts-morph";
import { fakeTypeElementMemberedNode } from "./fakeTypeElementMemberedNode";
import { ObjectContext } from "./ObjectContext";
import { Options } from "./Options";

export function fakeInterface(params: {
  node: InterfaceDeclaration;
  propertyPath?: string[];
  targetObject?: Record<string, any>;
  objectContext?: ObjectContext;
  options: Options;
}): Record<string, unknown> {
  const { node, propertyPath = [], targetObject = {}, objectContext = new ObjectContext(), ...rest } = params;
  for (const baseType of node.getBaseTypes()) {
    const declarations = baseType.getSymbolOrThrow().getDeclarations();
    for (const declaration of declarations) {
      /* istanbul ignore else */
      if (Node.isInterfaceDeclaration(declaration)) {
        fakeInterface({ node: declaration, propertyPath, targetObject, objectContext, ...rest });
      }
    }
  }
  return fakeTypeElementMemberedNode({ node, propertyPath, targetObject, objectContext, ...rest });
}
