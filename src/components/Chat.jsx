import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '../firebase-config'

const Chat = (props) => {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    const messageRef = collection(db, "messages")

    useEffect(() => {
        const queryMessage = query(messageRef, where("room", "==", props.room), orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(messages)
        })

        return () => unsubscribe()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === "") return

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: props.room
        })

        setNewMessage("")
    }

    return (
        <>
            <div className="component flex flex-col justify-between mx-6 w-full pl-3 relative">
                <div onClick={() => props.setRoom("")} className="back absolute -top-2 right-10 w-14 cursor-pointer"><img src="public/images/back.png" alt="" /></div>
                <h3 className='text-2xl font-bold underline'>Room : {props.room}</h3>
                <div className='h-[25rem] overflow-y-auto my-2'>
                    {messages.map((message) => (
                        <div key={message.id}>
                            <span className='font-bold text-[18px]'>{message.user} : </span>
                            <span className='text-[15px]'>{message.text}</span>
                            <span className='text-[9px]'> {message?.createdAt ? (
                                <>
                                    {message.createdAt.toDate().toLocaleTimeString()} {message.createdAt.toDate().toLocaleDateString()}
                                </>
                            ) : (
                                'Time not available'
                            )}</span>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className='flex justify-center items-center gap-2 w-full'>
                    <input type="text" className='w-full rounded-xl text-sm p-1' placeholder='Enter your Message' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
                    <button type='submit'><img src="public/images/send.png" width={30} alt="" /></button>
                </form>
            </div>
        </>
    )
}

export default Chat