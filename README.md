# Klontong-REST-API
REST API for Klontong project. This app is using PostgreSQL database.

## Documentation

For the documentation, please visit [here](https://documenter.getpostman.com/view/23999493/2s9YBz1uQZ)

## ERD

Here is the ERD of the apps.
![ERD Klontong](https://ik.imagekit.io/variniaz/erd-klontong_vkfb-sUyE.png?updatedAt=1694067077718)

## ENV Files

To test the app, kindly check the .env.example files.

## How to Config
Make sure the .env file has been filled correctly

Install the packages with this command
 ```sh
npm i
```
Create the database
```sh
sequelize db:create
```
Migrate the models to database
```sh
sequelize db:migrate
```
Run the apps in dev environment
```sh
npm run dev
```
If needed, use seeder to add category and user
```sh
sequelize db:seed:all
```

## Credentials for Example User from Seeders
username: user

email: user@example.com

password: example123
