#!/bin/sh

npm run build

PREFIX="dist/"
FAVICON=`find dist/ -name blobowo.*.svg`

# Ensure custom search engine has an image
echo "/favicon.ico /${FAVICON#$PREFIX} 302" > _redirects
