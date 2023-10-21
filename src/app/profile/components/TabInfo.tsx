'use client';
import React, { useCallback, useRef, useState } from 'react';
import { Input } from '@/components/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BiLogOutCircle, BiEdit, BiCloset, BiWindowClose, BiSave } from 'react-icons/bi';
import Button from '@/components/Button';
import Image from 'next/image';
import Avatar from '@/assets/images/bg-t1.png';
import { IoMdClose } from 'react-icons/io';
import '@scss/components/TabInfo.scss'
interface Iinfo {
  firstname: string;
  lastname: string;
  address: string;
  numberPhone: string;
}

const initialValues: Iinfo = {
  firstname: '',
  lastname: '',
  address: '',
  numberPhone: '',
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  numberPhone: Yup.string().required('Number Phone is required'),
});
const listRoom = [
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
  {
    lable: 'CMU CSE309',
  },
];
const TabInfo: React.FC = () => {
  const [submitState, setSubmitState] = React.useState({
    info: false,
    room: false,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Xử lý khi nút gửi được nhấn
    },
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e?.target?.result;
        console.log(imageUrl);

        setSelectedImage(imageUrl as string);

        // Tại đây, bạn có thể thực hiện các xử lý khác, ví dụ: tải ảnh lên cloud
        // Sử dụng selectedFile để truy cập file đã chọn

        // Ví dụ pseudocode:
        // uploadImageToCloud(selectedFile);
      };

      reader.readAsDataURL(selectedFile);
    }
  };
  const handleStateInfo = useCallback(
    (e: any) => {
      e?.preventDefault();
      setSubmitState({
        ...submitState,
        info: !submitState.info,
      });
    },
    [submitState.info],
  );

  const handleStateRoom = useCallback(
    () =>
      setSubmitState({
        ...submitState,
        room: !submitState.room,
      }),
    [submitState.room],
  );
  return (
    <div className="Tabinfo  flex ">
      <div className="tabinfo__from w-[60%]">
        <form action="" className="">
          <div className="from__header flex items-center py-6 px-1 justify-between">
            <h2 className="text-5xl max-lg:max-w-none text-start leading-tight">Infomation</h2>
            {submitState.info ? (
              <Button onClick={handleStateInfo}>
                <BiSave className="text-4xl m-2 cursor-pointer" />
              </Button>
            ) : (
              <Button onClick={handleStateInfo}>
                <BiEdit className="text-4xl m-2 cursor-pointer" />
              </Button>
            )}
          </div>
          <div className="Form__group px-2 mb-2">
            <Input
              id="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="First name"
              className="rounded-sm border-b-2"
              disabled={!submitState.info}
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {formik.touched.firstname && formik.errors.firstname ? (
                <span>{formik.errors.firstname}</span>
              ) : null}
            </p>
          </div>
          <div className="Form__group px-2 mb-2">
            <Input
              id="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Last name"
              className="rounded-sm border-b-2"
              disabled={!submitState.info}
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {formik.touched.lastname && formik.errors.lastname ? (
                <span>{formik.errors.lastname}</span>
              ) : null}
            </p>
          </div>
          <div className="Form__group px-2 mb-2">
            <Input
              id="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Address"
              className="rounded-sm border-b-2"
              disabled={!submitState.info}
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {formik.touched.address && formik.errors.address ? (
                <span>{formik.errors.address}</span>
              ) : null}
            </p>
          </div>
          <div className="Form__group px-2 mb-2">
            <Input
              id="numberPhone"
              value={formik.values.numberPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Number Phone"
              className="rounded-sm border-b-2"
              disabled={!submitState.info}
            />
            <p className="error text-red-600 text-lg min-h-[20px] mx-6 my-2">
              {formik.touched.numberPhone && formik.errors.numberPhone ? (
                <span>{formik.errors.numberPhone}</span>
              ) : null}
            </p>
          </div>
        </form>
        <div className="Tabinfo-room">
          <div className="from__header flex items-center py-6 px-1 justify-between">
            <h2 className="text-5xl max-lg:max-w-none text-start leading-tight">Room name</h2>
            {submitState.room ? (
              <Button onClick={handleStateRoom}>
                <BiSave className="text-4xl m-2 cursor-pointer" />
              </Button>
            ) : (
              <Button onClick={handleStateRoom}>
                <BiEdit className="text-4xl m-2 cursor-pointer" />
              </Button>
            )}
          </div>
          <div className="Tabinfo-room__body flex flex-wrap gap-2 rounded-md dark:bg-[#3b3b3b] border-gray-300 dark:border-none  p-4 border shadow-sm max-h-[25vh] overflow-hidden scroll-auto">
            {listRoom &&
              listRoom.map((item) => (
                <div className="Tabinfo-room__item w-[122px] flex  overflow-hidden justify-center gap-2 h-[40px]  ml-4 text-xs  items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full cursor-pointer">
                  <p className="text-xl">{item.lable}</p>
                  {submitState.room && <IoMdClose className="text-4xl " />}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div></div>
      <div className="TabInfo-avatar flex flex-col justify-center items-center w-[40%]  ">
        <label className="TabInfo-avatar__image relative  flex flex-col justify-center items-center gap-3 p-4 overflow-hidden">
          {selectedImage ? (
            <div
              className=" max-h-[200px] max-w-[200px] 
           min-w-[20em] p-1 rounded-full ring-2 ring-gray-300 
           dark:ring-gray-500 cursor-pointer overflow-hidden"
            >
              <Image
                className="w-80 h-80 object-cover relative  overflow-hidden"
                src={selectedImage}
                alt="Bordered avatar"
                onClick={handleImageClick}
                fill
              />
            </div>
          ) : (
            <Image
              className="w-80 h-80 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
              src={Avatar}
              alt="Bordered avatar"
              onClick={handleImageClick}
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <h2 className="text-5xl">Minh Nha</h2>
          <p className="text-2xl">Click if you change Avatar</p>
        </label>
      </div>
    </div>
  );
};

export default TabInfo;
