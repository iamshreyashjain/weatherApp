import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "./context/firebase";
import { IoLogoFirebase } from "react-icons/io5";
import { useState } from "react";
import Appon from "./AppOn";

const db = getDatabase(app);

export default function App() {
  const [data, setData] = useState({
    username: '',
    userage: '',
  });

  const putData = async () => {
    try {
      const newRef = ref(db, 'users');
      const newChildRef = push(newRef); // Generate a unique key
      await set(newChildRef, {
        Name: data.username,
        Age: data.userage,
      });
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    putData();
    setData({
      username: '',
      userage: '',
    });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 border-4 rounded-lg border-red-600 py-20 px-12 bg-gradient-to-b from-red-100  to-red-400">
          <input
            type="text"
            onChange={handleOnChange}
            placeholder="Enter Name"
            name="username"
            value={data.username}
            className="border-2 rounded-lg border-red-600 py-1 px-3 focus:border-red-600 focus:outline-none"
          />
          <input
            type="text"
            onChange={handleOnChange}
            placeholder="Enter Age"
            name="userage"
            value={data.userage}
            className="border-2 rounded-lg border-red-600 py-1 px-3 focus:border-red-600 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 border-4 border-slate-500 bg-gradient-to-b from-red-300 via-red-500 to-red-600 text-white mx-auto mt-10 rounded-lg shadow-lg shadow-slate-300"
          >
            PUT DATA <IoLogoFirebase color="orange" size={25} />
          </button>
        </form>
      </div>
      <Appon/>
    </>
  );
}
