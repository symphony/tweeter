# Tweeter Project
<sub>*version 1.0.0*</sub>

Tweeter is a simple, single-page Twitter clone.

<sub>Disclaimer - This app was built for educational purposes only. All data is only stored locally and lost about stopping the server.</sub>

## Features

* `Write a tweet`
* `AJAX Requests`
* `Self-Reloading Feed`
* `Responsive Design`

## Getting Started

**Clone or Download the Project**

`git clone git@github.com:symphony/tweeter.git && cd tweeter`

**Install Dependencies:**

`npm install` (inside the project folder)

**Run the Server:**

`npm start`

**Visit Tweeter Your Browser:**

`http://localhost:3000` (default port is 3000)

**Stop the Server**

Use hotkey `CTRL + C` in the terminal (see below for more options)

**Uninstall**

To uninstall, simply delete the project folder `/tweeter/` from your computer.

---

![Screenshot of Tweeter Mobile](docs/tweet1.png?raw=true "Tweeter Mobile")

![Screenshot of Mobile Feed](docs/tweet2.png?raw=true=x400 "Mobile Feed")

![Screenshot of Desktop View](docs/tweet3.png?raw=true=400 "Desktop View")

![Screenshot of Alert Box](docs/tweet4.png?raw=true "Alert Box")

---

## Dependencies

- Express
- Node 5.10.x or above
- Body-Parser
- Chance
- MD5
- (Dev) Nodemon


### Troubleshooting

 - Server can be run with nodemon by using `npm run dev`
 - If you need to force close the server it can be found using `lsof -i tcp`
 - Find the running service with the matching port number (usually 3000), then enter `kill <PID>`

*Thanks for tweeting!*