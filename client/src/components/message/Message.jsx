import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useAuthUser from "../../auth/getUser";
import { auth } from "../../firebase";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CiStar } from "react-icons/ci";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";

const UserList = ({
  users,
  selectedUser,
  onSelectUser,
  favorites,
  toggleFavorite,
}) => (
  <div className="w-full max-md:sticky md:w-1/4 text-w bgw bg-gray-100 p-4 md:overflow-y-auto overflow-x-auto">
    <h2 className="text-2xl font-bold mb-4">Users</h2>
    <ul className="max-md:flex">
      {users.map((user) => (
        <li
          key={user?._id}
          className={`p-2 cursor-pointer flex flex-col items-start justify-between w-full ${
            selectedUser && selectedUser?._id === user?._id
              ? "bg-[#EDF7F4] bgww text-white"
              : "bg-white bgww text-black textw"
          }`}
          onClick={() => onSelectUser(user)}
        >
          <div className="flex gap-1 items-center w-full justify-between">
            <div className="flex items-center">
              <img src={user.image} alt="" className="w-8 h-8 rounded-full mr-2" />
              <h3 className="text-black textw">{user.name}</h3>
            </div>
            <CiStar
              className={`text-2xl text-black cursor-pointer ${
                favorites.includes(user?._id) ? "text-yellow-500" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(user?._id);
              }}
            />
          </div>
          <div className="text-sm max-md:hidden textw text-gray-500 mt-1">
            {user?.text || "No messages yet"}
          </div>
          <div className="text-xs textw text-gray-400 mt-1">
            {/* {user.latestMessage
              ? moment(user.timestamp).fromNow()
              : ""} */}
              <h3 className="max-md:hidden">6.50 pm</h3>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const MessageList = ({ messages, user }) => {
  const [clickedMessage, setClickedMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const handleTimestampClick = (messageId) => {
    setClickedMessage((prevClickedMessage) =>
      prevClickedMessage === messageId ? null : messageId
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-md:mt-20  mt-4 flex flex-col justify-end overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message?._id}
          className={`p-2 rounded-md text-[12px] ${
            message.sender === user?._id
              ? "w-[70%] sm:w-[50%] self-end text-white"
              : "w-[70%] sm:w-[50%] self-start"
          }`}
        >
          <div
            className={`flex justify-between p-3 rounded-2xl ${
              message.sender === user?._id
                ? "bg-[rgb(39,146,168)]"
                : "bg-[#EDF7F4]"
            }`}
          >
            <span>{message.text}</span>
          </div>
          <p
            className="text-sm text-gray-600 cursor-pointer"
            onClick={() => handleTimestampClick(message._id)}
          >
            {clickedMessage === message._id ? (
              <h3 className="text-[12px]">
                {moment(message.timestamp).format("MMMM Do YYYY, h:mm a")}
              </h3>
            ) : (
              <h3 className="text-[12px]">
                {moment(message.timestamp).format("h:mm a")}
              </h3>
            )}
          </p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const NewMessagesList = ({ newMessages, markAsRead }) => (
  <div className="p-4 bg-yellow-100 border-t-2 border-yellow-500">
    <h3 className="text-xl font-bold">New Messages</h3>
    <ul>
      {newMessages.map((message) => (
        <li
          key={message?._id}
          className="p-2 bg-white border-b cursor-pointer"
          onClick={() => markAsRead(message?._id)}
        >
          {message.sender.name}: {message.text}
        </li>
      ))}
    </ul>
  </div>
);

function Message() {
  const { user } = useAuthUser(auth);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessages, setNewMessages] = useState([]);
  const [userMessageTimes, setUserMessageTimes] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/v1/api/userdata`);
        const fetchedUsers = result.data.filter((u) => u._id !== user?._id); // Filter out the current user

        if (fetchedUsers.length > 0) {
          setSelectedUser(fetchedUsers[0]);
        }

        const initialMessageTimes = fetchedUsers.reduce((acc, curr) => {
          acc[curr?._id] = 0;
          return acc;
        }, {});

        setUserMessageTimes(initialMessageTimes);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser && user) {
        try {
          const response = await axios.get(
            `http://localhost:8080/v1/api/message/${user?._id}/${selectedUser?._id}`
          );
          const sortedMessages = response.data.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          setMessages(sortedMessages);
          setFilteredMessages(sortedMessages);

          if (response.data.length > 0) {
            const lastMessage = response.data[response.data.length - 1];
            setUserMessageTimes((prevTimes) => ({
              ...prevTimes,
              [selectedUser?._id]: new Date(lastMessage.timestamp).getTime(),
            }));
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [selectedUser, user]);

  useEffect(() => {
    const fetchNewMessages = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:8080/v1/api/message/new/${user?._id}`
          );
          const sortedNewMessages = response.data.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          setNewMessages(sortedNewMessages);

          sortedNewMessages.forEach((message) => {
            setUserMessageTimes((prevTimes) => ({
              ...prevTimes,
              [message.sender?._id]: new Date(message.timestamp).getTime(),
            }));
          });
        } catch (error) {
          console.error("Error fetching new messages:", error);
        }
      }
    };

    const intervalId = setInterval(fetchNewMessages, 5000);

    return () => clearInterval(intervalId);
  }, [user]);

  const sortedUsers = [...users].sort((a, b) => {
    const timeA = userMessageTimes[a?._id] || 0;
    const timeB = userMessageTimes[b?._id] || 0;
    return timeB - timeA;
  });

  const sendMessage = async () => {
    if (messageText.trim() !== "" && user && selectedUser) {
      const newMessage = {
        sender: user?._id,
        receiver: selectedUser?._id,
        text: messageText,
      };

      try {
        const response = await axios.post(
          `http://localhost:8080/v1/api/message`,
          newMessage
        );
        const updatedMessages = [...messages, response.data].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setMessages(updatedMessages);
        setFilteredMessages(updatedMessages);
        setMessageText("");

        setUserMessageTimes((prevTimes) => ({
          ...prevTimes,
          [selectedUser?._id]: new Date(response.data.timestamp).getTime(),
        }));

        // Update the latest message for the selected user
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === selectedUser?._id
              ? { ...u, latestMessage: response.data }
              : u
          )
        );
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (searchText === "") {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(
        messages.filter((message) =>
          message.text.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };

  const toggleFavorite = (userId) => {
    if (favorites.includes(userId)) {
      setFavorites(favorites.filter((id) => id !== userId));
    } else {
      setFavorites([...favorites, userId]);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setSearchText("");
    setFilteredMessages(messages);
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.patch(
        `http://localhost:8080/v1/api/message/read/${messageId}`
      );
      setNewMessages(
        newMessages.filter((message) => message?._id !== messageId)
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessageText((prevText) => prevText + emojiObject.emoji);
  };

  const emojiPickerRef = useRef();

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="flex h-[704px] bgw flex-col sm:flex-row">
      <UserList
        users={sortedUsers}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <div className="flex-1 flex flex-col bgww bg-white p-4">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between border-b-[1px]">
            <div className="flex gap-2 items-center mb-4">
              <img src={selectedUser?.image} className="w-9 h-9 rounded-full" alt="" />
              <h2 className="text-2xl font-bold ">
                {selectedUser ? selectedUser.name : "Select a user to chat"}
              </h2>
            </div>
            <div className="flex gap-3">
              <CiStar className="text-2xl cursor-pointer" />
              <IoIosSearch
                className="text-2xl cursor-pointer"
                onClick={toggleSearch}
              />
              <HiOutlineDotsVertical
                className="text-2xl cursor-pointer"
                onClick={toggleOptions}
              />
              {showOptions && (
                <div className="absolute top-12 right-4 bg-white border rounded-md shadow-lg z-10">
                  <ul>
                    <li className="p-2 cursor-pointer">Delete Conversation</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {showSearch && (
            <input
              type="text"
              placeholder="Search messages"
              className="w-full p-2 mt-4  bgww border-gray-300 rounded-md"
              value={searchText}
              onChange={handleSearch}
            />
          )}
          <MessageList messages={filteredMessages} user={user} />
        </div>

        <div className="flex items-center p-2 mt-3 border-t-2">
          <button
            className="ml-2 bg-blue-500 text-white p-2 rounded-md"
            onClick={() => setShowEmojiPicker((val) => !val)}
          >
            😊
          </button>
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute bottom-20">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-2 border textw border-gray-300 rounded-md"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-500 text-white p-2 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
        {newMessages.length > 0 && (
          <NewMessagesList newMessages={newMessages} markAsRead={markAsRead} />
        )}
      </div>
    </div>
  );
}

export default Message;
