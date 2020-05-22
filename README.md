# TO RUN

mongoDB and redis must be running

The MongoDB database for this applications is name FinalProject95

* The following collections are needed in MongoDB:
- items
- transactions
- users
- current_items

* To test the various features of the application you will need to create both a buyer and a seller account 
  from the registration page.

* Only buyers can select 'purchase' which will only be shown if a buyer is logged in on each individual item page.
* Only sellers can post items from their dashboard.
* Sellers must re-enter the page to see a recently posted item under 'Listed Items'

in root folder, frontend, and backend:
```
npm i
```

in one terminal, run in root:
```
npm run dev-server
```

in second terminal, run in frontend:
```
npm start
```
