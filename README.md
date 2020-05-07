[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <h3 align="center">Api Rest With Nodejs and PostgreSQL</h3>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

## About The Project

This API Rest is a back-end test for a social media feed.

### Built With

All here is built-on Nodejs, PostgreSQL, Express and Knex.

- [Node](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [Knex](http://knexjs.org/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is a list things you need to use the software.

- Visual Studio Code
- PostgreSQL Server
- Insomnia

### Installation

#### 1. Clone the repository

```sh
$ git clone https://github.com/CWojahn/API-Rest-NodeJs-Pg.git
$ cd API-Rest-NodeJs-Pg
```

#### 2. Install all dependencies

```sh
$ yarn install
$ yarn global add knex
```

#### 3. Configure your database file

Open the file knexfile.js, then change with your data the below section:

```JS
  connection: {
			database: 'yourdatabase',
			user: 'youruser',
			password: 'yourpassword',
		}
```

#### 4. Create the .env file

Rename the .envexample to .env, then update the SECRET to your very dificult secret key

#### 5. Migrate all tables to your database

```sh
$ knex migrate:latest -all
```

#### 5. Start the server

```sh
$ yarn start
```

#### 6. Configure your Insomnia

##### 6.1 Open your Insomnia

##### 6.2 Import from the repository folder the file "Insomnia_Workspace"

#### 7. Using

##### 7. Create an User

In the Body, complete with the user data

#### 8. Login the new User

In the Basic, complete with the username and with the password, send this data then copy the response token

#### 9. Creating a Post

In the Headers, paste the token copied above in the x-access-token.
In the Body, complete with the post data.

#### 10. Follow and user

In the Headers, paste the token copied above in the x-access-token.
In the Body, complete with the post data.

#### 11. Show the Feed

In the Headers, paste the token copied above in the x-access-token.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Carlos Cristiano Wojahn - [![Twitter][twitter-shield]][twitter-url] - carloswojahn@gmail.com

Project Link: [https://github.com/CWojahn/API-Rest-NodeJs-Pg](https://github.com/CWojahn/API-Rest-NodeJs-Pg)

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/carloswojahn
[twitter-shield]: https://img.shields.io/badge/-@WCsolraC-black.svg?style=flat-square&logo=twitter&colorB=555
[twitter-url]: https://twitter.com/WCsolraC
[github-shield]: https://img.shields.io/badge/-Github-black.svg?style=flat-square&logo=Github&colorB=555
