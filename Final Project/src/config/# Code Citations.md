# Code Citations

## License: unknown
https://github.com/fu4303/11ty-collections/tree/4887b8195e037f4b18c556d21eee6d9c199ea010/src/posts/create-your-first-basic-11ty-website.md

```
>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}
```


## License: unknown
https://github.com/lemonport-io/lemonport-server/tree/5359ee035d4d8d9de3e58f230f64634bb3c04ede/passport.js

```
(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false,
```


## License: unknown
https://github.com/facebookincubator/fbc-js-core/tree/e4f5de725c5dec659467b3baed3a7302b27449ea/fbcnms-packages/fbcnms-auth/passport.js

```
, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error
```

