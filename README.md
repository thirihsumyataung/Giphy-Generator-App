# Giphy Generator App 

Giphy API which is used in this App is from GIPHY developer website (https://developers.giphy.com). 

## Deployed this project on GitHub page 

### https://thirihsumyataung.github.io/Giphy-Generator-App/

Notes: Pagination Component is not working when I deployed this app, that is why I didn't use that component but it worked well on localhost.

### `Beginner Warning...`

Don't forget to add 'homepage' and 'script' the package.json file before you deploy your project. 

### `For MAC User `

Step 1: `npm install gh-pages`

Step 2: Add "homepage" in package.json 
        `"homepage": "https://ur-GitHub-username.github.io/ur-Repository",` 

Step 3: Add "predeploy" and "deploy" in scripts 
`
  "scripts": { 
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },`

Step 4: `npm run deploy`



