# Plaint test typescript example to use Coffeeless Validator

## Seting up local testing:

1. Use npm link (Symlink for Development)

This method creates a symbolic link between the package and the examples/plain-typescript folder, allowing you to test changes in real-time.

In the package root directory run:
```
npm link
```
This command creates a global symlink to the package.

2. In examples/plain-typescript directory:
```
npm link coffeeless-validator

```
This links the global symlink to your examples/plain-typescript folder's node_modules.


3. Import the package in index.ts:
```
import { ValidationBuilder as Builder } from 'coffeeless-validator/dist';
```

## Start the test:

```
npm run start
```