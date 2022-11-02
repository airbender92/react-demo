## What is jsconfig.json?
It's a configuration file to assist your text editor. Your text editor's Language Server Protocol (LSP) looks into this file to learn more about your project.

While it appears this has originated from Visual Studio Code, any editor using LSP will make use of file jsconfig.json, including Visual Studio Code, Sublime Text and so on.

It's most commonly used to include/exclude folders in your intellisense (which nowadays most editors use LSP), and map aliases in your source code to certain folders.
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "$libs": ["src/libs"],
      "$libs/*": ["src/libs/*"],
    }
  },
  "include": ["src/**/*.d.ts", "src/**/*.js", "src/**/*.svelte"],
  "exclude": ["node_modules", "**/node_modules", "dist"]
}
```

This file basically tells the language server to:

### baseUrl
Use the `.` location as the project root (which is where file jsconfig.json) is.

### paths
It means `$libs` in your source code points to `/src/libs`. This is useful if your editor relies on LSP to locate the files. When you initiate go to file it will go to the right place.

### include
It means to include all folders and files ending with those extensions in providing you with file search, code completion.

### exclude
It means to exclude everything inside node_modules and dist folder. For instance, you don't want the compiled bundle to appear in search results when you are searching for symbols or variables.

### Remarks
In other words, you can consider the `jsconfig.json` file a bit like the `.gitignore` file, but for your editor's language server use only.

But keep in mind, if you are going to be using `jsconfig.json` to map aliases, you would need to do additional configuration to your module bundler, and update your eslint config, that is, if you use ESLint.

For instance, in a Node.js / CommonJS environment, you would need to tell your Node.js what `$libs` is. There are many ways to do so, but these days people mostly use `module-alias`.