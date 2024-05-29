const fs = require("fs");
const path = require("path");

/**
 * Recursively traverse the directory structure and build a file map.
 * @param {string} dir - The directory to start from.
 * @param {string} baseDir - The base directory for relative paths.
 * @param {Object} fileMap - The object to store the file map.
 * @param {Set<string>} ignoreDirs - The set of directory names to ignore.
 */
function traverseDirectory(dir, baseDir, fileMap, ignoreDirs) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(baseDir, filePath);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Skip ignored directories
            if (ignoreDirs.has(file)) {
                return;
            }
            fileMap[relativePath] = "directory";
            traverseDirectory(filePath, baseDir, fileMap, ignoreDirs);
        } else {
            fileMap[relativePath] = "file";
        }
    });
}

/**
 * Generate a file map for a given repository.
 * @param {string} repoPath - The path to the repository.
 * @param {Set<string>} ignoreDirs - The set of directory names to ignore.
 * @returns {Object} - The generated file map.
 */
function generateFileMap(repoPath, ignoreDirs) {
    const fileMap = {};
    traverseDirectory(repoPath, repoPath, fileMap, ignoreDirs);
    return fileMap;
}

// Example usage:
// Replace 'c:/Users/charlie.palmer/petooly-mobile-application' with the actual path to the repository
const repoPath = "c:/Users/charlie.palmer/petooly-mobile-application"; // Use forward slashes

// Set of directories to ignore
const ignoreDirs = new Set([
    "node_modules",
    ".git",
    ".husky",
    "android",
    "ios",
]);

const fileMap = generateFileMap(repoPath, ignoreDirs);

console.log(fileMap);

// Optionally, write the file map to a JSON file
const outputFilePath = path.join(repoPath, "fileMap.json");
fs.writeFileSync(outputFilePath, JSON.stringify(fileMap, null, 2));
console.log(`File map written to ${outputFilePath}`);
