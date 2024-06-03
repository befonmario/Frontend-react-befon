import React, { useState } from 'react';
import { HomeFilled, } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  {
    label: <Link to='/'>Home</Link>,
    key: 'Home',
    icon: <HomeFilled />,
  },
  {
    key: 'login',
    label: <Link to='/login'>Change Account</Link>
  },
  {
    key: 'profile',
    label: <Link to='/users/profile/:name'>Profile</Link>
  },
  {
    key: 'History quiz',
    label: <Link to='/quizzes/dashboard'>History Quiz</Link>
  },
  {
    key: 'Create Quiz',
    label: <Link to='/quizzes'>Create Quiz</Link>
  },
  {
    key: 'Data User',
    label: <Link to='/users'>Data User</Link>
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Navbar;
