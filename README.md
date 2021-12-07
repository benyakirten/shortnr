# Table of Contents
1. [The Project](#the-project)
2. [Tech Stack and Commands](#tech-stack)
3. [Commands](#commands)
3. [Outside Sources](#outside-sources)
4. [Packages Used](#packages-used)
5. [Other Thoughts](#other-thoughts)

## The Project

On the frontend, on the home page, a user can input a website link then submit a form. If the link is new, the link is sent to the backend to store in the database, and a corresponding short sequence is generated and output. The shortened link is shown as 'domain/{5-letters}'. If the user clicks the link, it will redirect to a second page. The second page queries API to query to the database for the full link then redirects the user to that page. If the link already exists, the backend returns that data instead.

The generation of the short sequence is taken from the last 5 letters of the MongoDB-generated ID. Since every document should have a unique ID, it's unlikely for there to be any overlap. If there is any overlap, the backend will move backwards through the ID to find an unused character sequence. If there are absolutely none available, the backend will generate random sequences using upper and lower case letters and 0-9. Because MongoDB IDs do not use uppercase letters, it's highly unlikely for there to be a match. If the short URL is still taken, the backend will try to repeat the operation up to 10e8 times, and if it can't find any possible shortened ID, it will create an error.

## Tech Stack
* Frontend: JavaScript (TypesScript/React)
* Backend: Node (TypeScript/Express)
* Database: MongoDB

NOTE: To use this app, you need an active MongoDB server and a connection URL set in the .env file in the backend folder. There is a backup that assumes there is an unsecured MongoDB running locally.

## Commands
To install (from home directory)
1. npm install
2. cd backend && npm install
3. cd ../frontend && yarn install

To run both (from home directory):
1. npm start (with database as is)
2. npm run seed (with database seeded with 5 default URLs)
3. npm run reset (with all URLs deleted from the database)

Frontend commands (all other commands, like yarn eject, aren't included):
1. yarn start
2. yarn test

Backend commands:
1. npm start
3. npm run seed (seed the database with 5 default URLs)
4. npm run reset (remove all URLs from the database)

## Outside Sources

I used the following sources while writing this app:
[geeksforgeeks.org](https://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/) - read about a month ago, but for the key generation method I opted to use Mongoose's autogenerated ID
[ihateregex.io](https://ihateregex.io/expr/url/) - to get a regex for a valid URL
[stackoverflow.com](https://stackoverflow.com/questions/60455119/react-jest-test-preventdefault-action) - to find out how to test in jest if event.preventDefault is called
[github/concurrently](https://github.com/open-cli-tools/concurrently) - I copied the example commands and only made slight modifications.

## Packages Used

1. To run the backend and the frontend simultaneously: concurrently
> I chose this package to run items concurrently from a base folder so only one command was needed. Alternatives would include: a shell script, a npm command like "(cd backend && npm start) & cd ../frontend && yarn start" (note: I haven't tested these, so I don't know how they would work) or a few other packages I don't know.
2. Frontend: react, react-router-dom, jest, @testing-library/react
> The frontend only really needed to output a simple input, a loading spinner and a button. I included react-router-dom because, though the project doesn't need pages, I think it makes the interface simpler and more indicative of its goals. The 
3. Backend: express, mongoose, dotenv, mocha, chai, chai-http, typescript (and various types), ts-node and nodemon
> I used mongoose rather than the normal MongoDB drivers because it was a little easier to set up.

## Comments

The frontend could use a little more refinement and to break things down into components, or a different framework could be used. But, in the end, the frontend is somewhat unimportant. The decision making happens mostly on the backend.

The first decision I made is to use MongoDB. I had three reasons to do this: 1. I had never used MongoDB in a project of my own, 2. I don't have any sort of relationships in my data, so it seemed like an ideal use case for a non-relational database and 3. it autogenerates ids, which I can use to id the short URLs.

The most notable decision I made is how I choose the IDs for the shortened URLs. It is, in short, not a scalable solution. Although it could potentially yield more possible results than could ever be needed. However, it relies on MongoDB and could potentially take a long time to generate once there are more than a certain amount of URLs generated. There are other, better solutions using the ideas in the geeksforgeeks article above, but I went with the path of least resistance.