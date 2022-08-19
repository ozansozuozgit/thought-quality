Todo

- Dynamic Notifications
- Streaks
- Asyncstorage for light and dark
- More Stats
- Marcus Aeuralious Quote
- Make Session Screen more attractive
- Add reverse sorting to session list for most recent to oldest
- Use localstorage to sign in faster without the login page showing

  For Streaks:
  Structure your database so that there's a collection holding all user's information, with each document id in the collection being a user's unique auto-generated Firebase uid.
  Now that you have a filing method for getting any user's data, you can track when they last signed in and how many consecutive days they've been signed in for using a Javascript Date() object.
  When a user signs in, if it's their first time create their document in the database and add a field with a new Date() object as its value. If it's not their first time, check the Date() object in their document in the database: if it's been less than 24 hours, they've signed in consecutive days. Otherwise, their streak is broken.
  Either way, update this Date Object with a new Date() object, and mark some field in their document in the database that tracks their "streak". In summary: On every sign in, check the Date obj to see if its been less than 24 hours, and modify some field tracking their hot streak accordingly. Finally, update the Date object with the current Date.

https://stackoverflow.com/questions/72691618/creating-a-hot-streak-feature-in-mobile-application
