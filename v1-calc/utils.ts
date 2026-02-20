export type AllowedOperators = "+" | "-" | "*" | "/" | "^";

export enum TokenType {
    ADD = "ADD",
    SUBTRACT = "SUBTRACT",
    MULTIPLY = "MULTIPLY",
    DIVIDE = "DIVIDE",
    POWER = "POWER",
    OPENPAR = "OPENPAR",
    CLOSEPAR = "CLOSEPAR",
    NUMBER = "NUMBER",
    EOF = "EOF", // End of file
}

export enum NodeKind {
    LITERAL = "LITERAL",
    BINARYEXPRESSION = "BINARYEXPRESSION"
}

export interface Token {
    type: TokenType;
    char: string;
}

export const TokenFactory = {
    create(type: TokenType, char: string): Token {
        return {
            type,
            char
        }
    }
}


export abstract class ASTNode {
    abstract value: string;

    abstract toJson(): any;
    abstract calculate(): any;
}

export class LiteralNode extends ASTNode {
    readonly kind: NodeKind.LITERAL = NodeKind.LITERAL;

    // Use 'public' to automatically create the 'value' property
    constructor(public value: string) {
        super();
    }

    // Converts "5" into the number 5
    calculate(): number {
        return Number(this.value);
    }

    // Simple representation of the number
    toJson(): { kind: NodeKind.LITERAL; value: string } {
        return {
            kind: this.kind,
            value: this.value
        };
    }
}

export class BinaryNode extends ASTNode {
    readonly kind: NodeKind.BINARYEXPRESSION = NodeKind.BINARYEXPRESSION;

    // Use 'public' to automatically create the 'value' property
    constructor(public value: AllowedOperators, public left: ASTNode, public right: ASTNode) {
        super();
    }

    calculate(): number {
        return BinaryNode.dispatch[this.value](this.left.calculate(), this.right.calculate())
    }

    // Recursively get children
    toJson() {
        return {
            kind: this.kind,
            value: this.value,
            left: this.left.toJson(),
            right: this.right.toJson(),
        }
    }

    static dispatch = {
        "+": BinaryNode.add,
        "-": BinaryNode.subtract,
        "*": BinaryNode.multiply,
        "/": BinaryNode.divide,
        "^": BinaryNode.power,
    };

    static add(a: number, b: number): number {
        return a+b;
    }

    static subtract(a: number, b: number): number {
        return a-b;
    }

    static multiply(a: number, b: number): number {
        return a*b;
    }

    static divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Divide by zero - undefined answer")
        }
        return a/b;
    }

    static power(a: number, b: number): number {
        return a**b;
    }
}


export class ASTNodeFactory {
    static createLiteral(value: string): ASTNode {
        return new LiteralNode(value);
    }

    static createBinary(value: AllowedOperators, left: ASTNode, right: ASTNode): ASTNode {
        return new BinaryNode(value, left, right)
    }
}

export class calculatorDispatch {
    static dispatch = {
        "+":  calculatorDispatch.add,
        "-": calculatorDispatch.subtract,
        "*": calculatorDispatch.multiply,
        "/": calculatorDispatch.divide,
        "^": calculatorDispatch.power,
    };

    static add(a: number, b: number): number {
        return a+b;
    }

    static subtract(a: number, b: number): number {
        return a-b;
    }

    static multiply(a: number, b: number): number {
        return a*b;
    }

    static divide(a: number, b: number): number {
        if (b < 0) {
            throw new Error("Divide by zero - undefined answer")
        }
        return a/b;
    }

    static power(a: number, b: number): number {
        return a**b;
    }
}

