Node.js File Tree Generator
===========================

This Node.js script recursively generates a file tree for a given repository, ignoring specified directories (e.g., `node_modules`, `.git`). The output is formatted as a tree-like structure, which can be saved to a text file.

Features
--------

-   Recursively traverses a directory structure.
-   Ignores specified directories (e.g., `node_modules`, `.git`).
-   Produces a tree-like formatted string of the directory structure.
-   Optionally saves the output to a text file.

Prerequisites
-------------

-   [Node.js](https://nodejs.org/) (version 12 or higher)

Usage
-----

1.  **Clone the Repository** (or copy the script into your project):

    `git clone https://github.com/yourusername/repo-name.git
    cd repo-name`

2.  **Set the Repository Path**:

    Modify the `repoPath` variable in `generateFileMap.js` to point to the absolute path of your repository:

    `const repoPath = 'c:/path/to/your/repo';  // Use forward slashes`

3.  **Run the Script**:

    Execute the script using Node.js:

    `node generateFileMap.js` or  `node generateFileTree.js`

4.  **Output**:

    The script will print the tree-like structure to the console and save it to `fileTree.txt` in the repository root.

Example Output
--------------

```
├── lib/
│   ├── models/
│   ├── pages/
│   ├── images/
│   ├── components/
│   ├── services/
│   ├── main.dart
│   └── firebase_options.dart
├── assets/
├── test/
├── ios/
├── android/
├── pubspec.yaml
└── README.md
```

Customization
-------------

### Ignoring Additional Directories

To ignore additional directories, add them to the `ignoreDirs` set. For example, to also ignore `dist` and `coverage` directories:

`const ignoreDirs = new Set(['node_modules', '.git', 'dist', 'coverage']);`

### Output File

By default, the script writes the tree structure to `fileTree.txt` in the repository root. To change the output file name or path, modify the `outputFilePath` variable:

`const outputFilePath = path.join(repoPath, 'customFileName.txt');`

License
-------

This project is licensed under the MIT License.

* * * * *

Feel free to modify and enhance the script to fit your specific requirements. Contributions are welcome!

* * * * *

Contributing
------------

If you have suggestions for improving this script or find any issues, please open an issue or submit a pull request on GitHub.

Author
------

Charlie Palmer
