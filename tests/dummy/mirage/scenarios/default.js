export default function(server) {
  server.createList('artist', 10);

  server.schema.artists.all().models.forEach(artist => {
    server.create('track', { artist });
  });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
