'use client';
import Header from '@/components/Header';
import { DefaultLoading } from '@/components/Loading';
import { useTheme } from 'next-themes';
import React, { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';
import Avatar from '@/assets/images/bg-t1.png';
import Image from 'next/image';
import Button from '@/components/Button';
import { BiLogOutCircle, BiUser, BiFoodMenu, BiLogOut } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { AUTH_LOGOUT, authDetail } from '@/redux/auth';
import { useRouter } from 'next/navigation';
import usePrivateRoute from '@/hooks/usePrivateRoute';
import { Input } from '@/components/Input';
import useToastily from '@/hooks/useToastily';
import { useFormik } from 'formik';
import TabInfo from './components/TabInfo';

const listTab = [
  { key: 1, icon: <BiUser />, lable: 'Profile', component: <TabInfo /> },
  { key: 2, icon: <BiFoodMenu />, lable: 'Fouder', component: <TabInfo /> },
];
const DEFAULT = 1;
const profilePage: React.FC = (props) => {
  // Private routes
  // const auth = usePrivateRoute();
  const router = useRouter();
  const { theme } = useTheme();
  const [TabKey, setTabKey] = useState<number>(DEFAULT);
  const [loading, setLoading] = React.useState(false);
  const showToast = useToastily();
  if (!theme) {
    return <DefaultLoading />;
  }
  const dispatch = useAppDispatch();
  const handleSignOut = useCallback(() => {
    dispatch(AUTH_LOGOUT());
    router.push('/');
  }, []);

  const currentTab = useMemo(() => {
    const tabItem = listTab.find((item) => item.key === TabKey);
    return tabItem ? tabItem.component : null;
  }, [TabKey]);
  return (
    <div className={`profilePage w-full h-[100vh]  ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Header className="relative z-100 w-[70%] max-lg:w-full" />
      <div className="profilePage__body flex items-center justify-center">
        <div className="profilePage__body__container relative rounded-3xl w-[80%] h-[83vh] bg-primary p-4">
          <div
            className={`profilePage__body__form w-full rounded-3xl h-full ${
              theme === 'light' ? 'bg-white' : 'bg-black'
            }`}
          >
            <div className="profile__body flex">
              <div className="profile-sidebar w-[20%] p-3">
                {listTab &&
                  listTab.map((tab) => (
                    <div
                      onClick={() => setTabKey(tab.key)}
                      className={`relative profile-sidebar__item text-4xl p-4 flex rounded-md font-bold cursor-pointer text-black dark:text-white `}
                    >
                      <div className="flex items-center gap-2">
                        {tab.icon && tab?.icon}
                        <p>{tab.lable}</p>
                      </div>

                      {tab.key === TabKey ? (
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary rounded-sm"></div>
                      ) : null}
                    </div>
                  ))}
                <div
                  className={`relative profile-sidebar__item text-4xl p-4 flex rounded-md font-bold cursor-pointer text-black dark:text-white `}
                >
                  <div className="flex items-center gap-2"   onClick={handleSignOut}>
                    <BiLogOut />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
              <div className="profile-content w-[80%]">{currentTab}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profilePage;
