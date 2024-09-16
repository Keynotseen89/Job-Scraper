# Job-Scraper
A few things need to be installed in order for the project to function properly

# Install Playwright
You'll need to install playwright librarys by running this command at root level
npm i -D playwright

# Install googleapis
You'll also need to install the googleapi in order to save to your googlesheets.
Make sure to run this at root level.
npm install googleapis

# Install these also
npm i -D tsx
npm insall dotenv

tsx is used when running this on linux 

# How to run
In order to run the script run this command through the root.
npx tsx ./web-script/<name-of-script>.spec.ts

If in web-script directory run just run
npx tsc <name-of-script>.spec.ts
