# Running Locally

* clone repo and cd into project directory
* **NOTE:** expects to have `bundle` and `nvm` installed (please search the internet for that on your OS of choice)

## Rails Setup
* `bundle`
* `rake db:setup`
* `rails s -p=3001` need to specify port since React will use 3000

## React Setup
* `cd ./browser`
* `nvm use`
* `yarn`
* `yarn run start`

### Props to these inspirational posts

* https://www.sitepoint.com/react-rails-5-1/
* https://www.thegreatcodeadventure.com/jwt-auth-in-rails-from-scratch/
* https://www.thegreatcodeadventure.com/jwt-authentication-with-react-redux/
