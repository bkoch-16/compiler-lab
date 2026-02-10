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


