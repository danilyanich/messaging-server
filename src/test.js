const fetch = require('node-fetch');

const url = 'http://localhost:3000/';

(async () => {
  const token = await fetch(`${url}auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'dan' }),
  }).then(res => res.text());

  await fetch(`${url}auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'alina' }),
  });

  await fetch(`${url}auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'ivan' }),
  });

  const nextHeaders = {
    'Authorization': token,
    'Content-Type': 'application/json',
  }

  const user = await fetch(`${url}user/me`, {
    method: 'GET',
    headers: nextHeaders,
  }).then(res => res.json());
  console.log(user);

  const users = await fetch(`${url}user/`, {
    method: 'GET',
    headers: nextHeaders,
  }).then(res => res.json());
  console.log(users);



  await fetch(`${url}message/newMessage`, {
    method: 'POST',
    headers: nextHeaders,
    body: JSON.stringify({
      to: users[1]._id,
      text: 'Hello',
    })
  });
  await fetch(`${url}message/newMessage`, {
    method: 'POST',
    headers: nextHeaders,
    body: JSON.stringify({
      to: users[1]._id,
      text: 'How',
    })
  });
  await fetch(`${url}message/newMessage`, {
    method: 'POST',
    headers: nextHeaders,
    body: JSON.stringify({
      to: users[1]._id,
      text: 'Are',
    })
  })
  await fetch(`${url}message/newMessage`, {
    method: 'POST',
    headers: nextHeaders,
    body: JSON.stringify({
      to: users[1]._id,
      text: 'You?',
    })
  });

  const messages = await fetch(`${url}message/${users[1]._id}`, {
    method: 'GET',
    headers: nextHeaders,
  }).then(res => res.json());

  console.log(messages);

  await fetch(`${url}message/markAdRead/${users[1]._id}`, {
    method: 'POST',
    headers: nextHeaders,
  });

  const readMessages = await fetch(`${url}message/${users[1]._id}`, {
    method: 'GET',
    headers: nextHeaders,
  }).then(res => res.json());

  console.log(readMessages);
})();
