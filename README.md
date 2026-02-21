Scientific calculator for integers using a compiler-like pattern

Includes basic vitest testing suite
Unary support (negative numbers)
Type safety

Supported Operators:

- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `^` Exponentiation
- `()` Parentheses

Process

1. Scan the input and turn them into tokens
2. Use recursive descent to create an AST
3. Calculate solution using post-order traversal

Run Instructions

- Parser: `npm install && npx tsx src/main.ts "<expression>"`
- Tests: `npx vitest`
- Formatter: `npm run format`
