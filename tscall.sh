#!/bin/bash
echo "compiling TypeScript files..."
tsc config.ts
tsc app.ts
tsc www.ts
echo "Compiling routes..."
tsc routes/*.ts
echo "Complete"
