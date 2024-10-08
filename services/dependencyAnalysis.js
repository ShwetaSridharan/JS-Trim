const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function analyzeCode(code) {
    const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx'],
    });

    const dependencies = new Set();

    traverse(ast, {
        ImportDeclaration({ node }) {
            dependencies.add(node.source.value);
        },
        CallExpression({ node }) {
            if (node.callee.name === 'require') {
                dependencies.add(node.arguments[0].value);
            }
        },
    });

    return Array.from(dependencies);
}

module.exports = {
    analyzeCode,
};