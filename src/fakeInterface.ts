import { InterfaceDeclaration, Node } from "ts-morph";
import { fakeTypeElementMemberedNode } from "./fakeTypeElementMemberedNode.js";
import { ObjectContext } from "./ObjectContext.js";
import { Options } from "./Options.js";

export function fakeInterface(params: {
  node: InterfaceDeclaration;
  propertyPath?: string[];
  targetObject?: Record<string, any>;
  objectContext?: ObjectContext;
  options: Options;
}): Record<string, unknown> {
  const { node, propertyPath = [], targetObject = {}, objectContext = new ObjectContext(), ...rest } = params;
  node.getBaseTypes().forEach((baseType) => {
    const declarations = baseType.getSymbolOrThrow().getDeclarations();
    for (const declaration of declarations) {
      if (Node.isInterfaceDeclaration(declaration)) {
        fakeInterface({ node: declaration, propertyPath, targetObject, objectContext, ...rest });
      }
    }
  });
  return fakeTypeElementMemberedNode({ node, propertyPath, targetObject, objectContext, ...rest });
}
