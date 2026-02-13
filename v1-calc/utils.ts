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

export type ASTNode = LiteralNode | BinaryNode

interface LiteralNode {
    kind: NodeKind.LITERAL,
    value: string,
}

interface BinaryNode {
    kind: NodeKind.BINARYEXPRESSION,
    value: string,
    left: ASTNode,
    right: ASTNode,
}


export const ASTNodeFactory = {
    createLiteral(value: string): LiteralNode {
        return {
            kind: NodeKind.LITERAL,
            value
        }
    },

    createBinary(value: string, left: ASTNode, right: ASTNode): ASTNode {
        return {
            kind: NodeKind.BINARYEXPRESSION,
            value,
            left,
            right,
        }
    }
}

