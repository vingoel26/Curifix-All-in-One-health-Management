import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { MyContext } from '../components/MyContext.jsx';
import {v1 as uuidv1} from 'uuid';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../components/MyContext';

function Chat() {
  const { isAuthenticated } = useAuth();
  const [prompt,setPrompt]=useState("");
  const [reply,setReply]=useState(null);
  const [currthreadid,setcurrthreadid]=useState(uuidv1());
  const [prevChats,setPrevChats]=useState([]);
  const [newChat,setNewChat]=useState(true);
  const [allthreads,setallthreads]=useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const providerValues={prevChats,allthreads,setallthreads,setPrevChats,newChat,setNewChat,prompt,setPrompt,reply,setReply,currthreadid,setcurrthreadid,sidebarOpen,setSidebarOpen};

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access the chat feature.</p>
          <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className='app flex h-screen overflow-hidden'>
      <MyContext.Provider value={providerValues}>
      <Sidebar />
      <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default Chat
