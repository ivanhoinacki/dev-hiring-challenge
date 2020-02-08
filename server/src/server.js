import app from './app';

app.listen(process.env.PORT, () => {
  console.log(
    'API running on port: ' + process.env.PORT + ' in ' + process.env.NODE_ENV
  );
});
