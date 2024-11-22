import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./context/firebase";

export default function Chat() {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const messageRef = collection(db, "messages");

    useEffect(() => {
        // Set up Firestore listener
        const queryMessages = query(messageRef);
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messageList = [];
            snapshot.forEach((doc) => {
                messageList.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messageList); // Update messages state
        });

        // Clean up listener on unmount
        return () => unsubscribe();
    }, []); // Empty dependency array ensures this runs once on mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") {
            return;
        }

        setLoading(true); // Show loading while sending the message

        try {
            await addDoc(messageRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName || "Anonymous",
            });
            setNewMessage(""); // Clear the input field after submission
        } catch (error) {
            console.error("Error adding message: ", error);
        } finally {
            setLoading(false); // Stop loading after the request
        }
    };

    return (
        <div>
            <div className="messages">
                {messages.map((message) => (
                    <h1 key={message.id}>{message.text}</h1> // Use unique key for each item
                ))}
            </div>
            <form onSubmit={handleSubmit} className="m-3">
                <input
                    className="border-2 border-gray-400 rounded-md px-2 py-1"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <br />
                <button
                    type="submit"
                    className="bg-gray-100 border-gray-900 border-2 px-3 py-1 rounded-md my-3 text-blue-500"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Sending..." : "Enter Chat"} {/* Show loading text */}
                </button>
            </form>
        </div>
    );
}
