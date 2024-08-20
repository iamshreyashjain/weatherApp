import { useEffect, useState } from "react";

export default function Data() {
  const [users, setUsers] = useState({}); // State to hold the fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://learner-dc009-default-rtdb.asia-southeast1.firebasedatabase.app/users.json'
        );
        const data = await response.json();
        if(data){
        setUsers(data); // Set fetched data to state
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
}, [users]); // Fetch data only once after the component mounts

  // Function to delete a user from Firebase
  const handleDelete = async (key) => {
    try {
      await fetch(
        `https://learner-dc009-default-rtdb.asia-southeast1.firebasedatabase.app/users/${key}.json`,
        {
          method: 'DELETE',
        }
      );

      // Update the state by removing the deleted user
      const updatedUsers = { ...users };
      delete updatedUsers[key];
      setUsers(updatedUsers);

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Data</h1>
      <div>
        {Object.entries(users).map(([key, user]) => (
          <div key={key} className="grid grid-cols-3 mx-3 gap-3 items.ceter justify-evenly mt-3 ">
            <span className="">{user.Name}</span>  <span>{user.Age}</span>
            <button onClick={() => handleDelete(key)} className="px-3 py-1 mx-4 bg-red-500 text-white rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
