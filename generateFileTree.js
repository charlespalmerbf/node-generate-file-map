const fs = require('fs');
const path = require('path');

/**
 * Recursively traverse the directory structure and build a file tree object.
 * @param {string} dir - The directory to start from.
 * @param {Set<string>} ignoreDirs - The set of directory names to ignore.
 * @returns {Object} - The file tree object.
 */
function buildFileTree(dir, ignoreDirs) {
    const fileTree = {};
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        if (ignoreDirs.has(file)) return;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            fileTree[file] = buildFileTree(filePath, ignoreDirs);
        } else {
            fileTree[file] = 'file';
        }
    });

    return fileTree;
}

/**
 * Generate a file tree for a given repository.
 * @param {string} repoPath - The path to the repository.
 * @param {Set<string>} ignoreDirs - The set of directory names to ignore.
 * @returns {Object} - The generated file tree.
 */
function generateFileTree(repoPath, ignoreDirs) {
    return buildFileTree(repoPath, ignoreDirs);
}

/**
 * Format a file tree object into a tree-like string.
 * @param {Object} tree - The file tree object.
 * @param {string} prefix - The prefix for the current level.
 * @returns {string} - The formatted tree string.
 */
function formatFileTree(tree, prefix = '') {
    let treeString = '';

    const keys = Object.keys(tree);
    keys.forEach((key, index) => {
        const isLast = index === keys.length - 1;
        const newPrefix = prefix + (isLast ? '└── ' : '├── ');
        treeString += `${newPrefix}${key}`;

        if (tree[key] === 'file') {
            treeString += '\n';
        } else {
            treeString += '/\n' + formatFileTree(tree[key], prefix + (isLast ? '    ' : '│   '));
        }
    });

    return treeString;
}

// Example usage:
// Replace 'c:/Users/charlie.palmer/petooly-mobile-application' with the actual path to the repository
const repoPath = 'c:/Users/charlie.palmer/petooly-mobile-application';  // Use forward slashes

// Set of directories to ignore
const ignoreDirs = new Set(['node_modules', '.git']);

const fileTree = generateFileTree(repoPath, ignoreDirs);
const formattedTree = formatFileTree(fileTree);

console.log(formattedTree);

// Optionally, write the formatted tree to a text file
const outputFilePath = path.join(repoPath, 'fileTree.txt');
fs.writeFileSync(outputFilePath, formattedTree);
console.log(`File tree written to ${outputFilePath}`);
