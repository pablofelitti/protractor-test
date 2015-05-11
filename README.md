# protractor-test

- To setup

1) Install NodeJS
2) Using NPM install protractor
3) Run "webdriver-manager update" (it installs and runs chrome browser by default)
4) Start the server with "webdriver-manager start" (if it fails for some java reason, check that java is installed correctly with "java -version")

- If you use IntelliJ, the way to create NodeJS run configuration:

Node interpreter: The bin directory with the NodeJS executable
Working directory: The directory of the current project
Javascript file: The following file <YOUR_CUSTOM_PATH>\node_modules\protractor\lib\cli.js
Application parameters: the config file of your test suit (ford-desktop-conf.js or ford-mobile-conf.js or inode-conf.js)