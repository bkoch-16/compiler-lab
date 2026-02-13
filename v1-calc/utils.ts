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
        return parseFloat(this.value);
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
    constructor(public value: string, public left: ASTNode, public right: ASTNode) {
        super();
    }

    /// TODO: Implement calculate
    calculate(): number {
        return 1;
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
}


export class ASTNodeFactory {
    static createLiteral(value: string): ASTNode {
        return new LiteralNode(value);
    }

    static createBinary(value: string, left: ASTNode, right: ASTNode): ASTNode {
        return new BinaryNode(value, left, right)
    }
}

