db = db.getSiblingDB('the_database');

try {
  db.createUser({
    user: 'the_username',
    pwd: 'the_password',
    roles: [{ role: 'readWrite', db: 'the_database' }],
  });
} catch (e) {
  print('Error creating user:', e);
}

db.createCollection('blogs');

db.blogs.insertMany([
  { title: 'First Blog', author: 'John Doe', url: 'https://example.com/first-blog', likes: 10 },
  { title: 'Second Blog', author: 'Jane Smith', url: 'https://example.com/second-blog', likes: 20 },
  { title: 'Third Blog', author: 'Alice Johnson', url: 'https://example.com/third-blog', likes: 15 }
]);