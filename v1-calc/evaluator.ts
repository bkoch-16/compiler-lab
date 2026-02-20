import {ASTNode, ASTNodeFactory, type Token, TokenType} from './utils.js'

export class Evaluator {
    tree: ASTNode;

    constructor(tree: ASTNode) {
        this.tree = tree;
    }
    
}