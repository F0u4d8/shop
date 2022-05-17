import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('190801', 10),
    isAdmin: true,
    adress: 'bechar',
  },
  {
    name: 'fouad',
    email: 'fouad@example.com',
    password: bcrypt.hashSync('190801', 10),
    adress: 'bechar',
  },
  {
    name: 'med',
    email: 'med@example.com',
    password: bcrypt.hashSync('190801', 10),

    adress: 'bechar',
  },
];

export default users;
