const fetch = require('node-fetch');

// const url = 'https://powerful-temple-32295.herokuapp.com/';
const url = 'http://localhost:3000/';

(async () => {
  const token = await fetch(`${url}auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'dan', password: '12345678' }),
  }).then(res => res.text());

  await fetch(`${url}auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'alina', password: '12345678' }),
  }).then(res => res.text());

  const nextHeaders = {
    'Authorization': token,
    'Content-Type': 'application/json',
  }

  const user = await fetch(`${url}users/me`, {
    method: 'GET',
    headers: nextHeaders,
  }).then(res => res.json());

  console.log('me', user._id, user.username);

  const users = await fetch(`${url}users`, {
    method: 'GET',
    headers: nextHeaders,
  }).then(res => res.json());

  console.log('others', users.map(user => user.username));

  await fetch(`${url}messages`, {
    method: 'POST',
    headers: nextHeaders,
    body: JSON.stringify({
      receiverId: users[1]._id,
      message: `Hello ${users[1].username}`,
    })
  });

  const messages = await fetch(`${url}messages?receiverId=${users[1]._id}`, {
    method: 'GET',
    headers: nextHeaders,
  }).then(res => res.json());

  console.log('mesages', messages);

  await fetch(`${url}messages/markAdRead?senderId=${users[1]._id}`, {
    method: 'POST',
    headers: nextHeaders,
  });

  const readMessages = await fetch(`${url}messages?receiverId=${users[1]._id}`, {
    method: 'GET',
    headers: nextHeaders,
  }).then(res => res.json());

  console.log('readMessages', readMessages);
})();
