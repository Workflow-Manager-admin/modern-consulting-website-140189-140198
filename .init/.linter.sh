#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-consulting-website-140189-140198/consulting_website_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

