# SkyScan

An App that tells you the weather!

**Created By:**

**Sachin Panayil, Steve Roy, David Perez, Zhi Wei Wu, Kamran Sajid**


# To Run

**Windows:**

First Step

o Install Mongo from this link

▪ https://www.mongodb.com/try/download/community

o Follow this tutorial to properly install mongo

▪ https://www.youtube.com/watch?v=oC6sKlhz0OE&t=555s

▪ Only follow up to 8:25


Second Step

o Start MongoD by running the Mongod.exe program

▪ Should be located here

▪ C:\Program Files\MongoDB\Server\6.0\bin

o Open the client folder on a separate terminal

o Open the server folder on another separate terminal

o Run npm install on both terminals

o After installing is done, run npm run start


Troubleshooting

o If you can’t run your server folder properly, do the following

▪ Go into the server folder

▪ Find db,js

▪ Edit line 4 to

• await mongoose.connect('mongodb://127.0.0.1:27017/weatherapp');


**MacOS:**

First Step:

- Open terminal and run these commands

- xcode-select --install

Second Step: Installing brew

- /bin/bash -c "$(curl -fsSLhttps://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Third Step: Installing Mongo

- brew tap mongodb/brew

- brew update

- brew install mongodb-community@6.0

Fourth Step: (Optional if error comes up when installing Mongo, run these

commands and install mongo again)

- rm -fr $(brew --repo homebrew/core)

brew tap homebrew/core

Fifth Step: Start up mongo before npm install and npm start on both folders

- brew services start mongodb-community@6.0

Sixth step:

- Start up App

- Open both folders in separate terminals

- Run npm install and npm start on server folder

- Run npm install and npm start on client folder


Links for MacOS:

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

https://brew.sh/#install

https://stackoverflow.com/questions/70561887/brew-installation-not-a-valid-reference-error
