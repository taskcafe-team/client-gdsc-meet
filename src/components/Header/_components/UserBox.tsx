import React from 'react';
import PropTypes from 'prop-types';
import { BiUser } from 'react-icons/bi';
import Link from 'next/link';

const UserBox: React.FC = (props) => {
  return (
    <Link href={'/signIn'}>
      <div className="Header__item group hover:bg-black drop-shadow-sm dark:hover:bg-white  px-4 py-2 transition-all rounded-md cursor-pointer">
        <BiUser className="dark:text-white dark:group-hover:text-black text-black  group-hover:text-white block transition-all" />
      </div>
    </Link>
  );
};

UserBox.propTypes = {};

export default UserBox;
