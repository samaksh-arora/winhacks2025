# Team Amherstburgers
## Authors
- Sam Arora
- Nick Boisclair
- Justin Bornais

## Inspiration
As software developers, we know how important it is to stay hydrated, and how easy it is to forget to stop and drink while we're programming. We also know that motivating people to work towards best health practices is also a challenge. That is why we wanted to make an interactive game to promote hydrating yourself, and we wanted to make the process fun for the users.

## What it does
This game allows you to create an account and keep track of your daily water intake. As you drink, the water tank on your dashboard fills with water. Once it fills up, you level up and get a point multiplier. Keep drinking every day to win more badges like "Senior Sipper" and the top badge "Master of Moisture"!

## How we built it
We used NextJS for the frontend code, as well as Flask for our backend server. The actual data is stored in a SQLite database.

Users can register and login. bcrypt is used to hash the password when storing in the database for added security. The current session is authenticated using JWTs, which is then verified by the NextJS middleware.

## Challenges we ran into
Our NextJS and Flask applications run on different ports, leading to various CORS-related issues. The biggest challenge was authenticating the token via cookies and the middleware, due to the very nature of having the tokens written from one source and saved to the other. While we got the tokens properly working on Chrome, the middleware remained a challenge that we will have to continue to work on.

## Accomplishments that we're proud of
NextJS was new for many of us, so learning how to use it was a large accomplishment. Also, animating the water tank to dynamically fill up with water was a large milestone, as it taught us more about how animations work via CSS and NextJS libraries.

Lastly, getting the backend connected to the SQLite database and getting it working was a large accomplishment that took a good deal of our development time.

## What we learned
We learned how JWTs work and especially how they're shared between two different sources. We learned how to use NextJS routing and middleware. Additionally, we learned more about UI design with tailwind, SVGs and React components.

## What's next for Team Amherstburgers
For the future, we want to work even further on getting the middleware in working order, as well as adding extra changes to the frontend design in order to reflect other edge cases that may occur in the backend.

Additionally, we want to expand this project past just water intake into other health-related tasks. Our database is already setup to support this in the future with our `action_type` table.

## Introduction

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend. One great use case of this is to write Next.js apps that use Python AI libraries on the backend.

### Deploy Your Own

First, install the dependencies:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh - # installs pnpm
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).
