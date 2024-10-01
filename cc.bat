powershell tsc 
powershell browserify ./dist/comp/index.js -o ./dist/bundle.js
powershell Remove-Item -Path ".\dist\comp" -Recurse -Force