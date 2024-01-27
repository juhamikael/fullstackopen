CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text not null,
    title text not null,
    likes int not null
);
insert into blogs (author, url, title, likes)
values (
        'Michael Chan',
        'https://reactpatterns.com/',
        'React patterns',
        7
    );
insert into blogs (author, url, title, likes)
values (
        'Robert C. Martin',
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        'Clean Code',
        5
    );