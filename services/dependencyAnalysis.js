const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs');
const path = require('path');

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ast = parser.parse(content, {
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

function analyzeDependencies(projectPath) {
  const dependencies = {};

  function traverseDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        traverseDirectory(filePath);
      } else if (path.extname(file) === '.js') {
        dependencies[filePath] = analyzeFile(filePath);
      }
    });
  }

  traverseDirectory(projectPath);
  return dependencies;
}

module.exports = {
  analyzeDependencies,
};