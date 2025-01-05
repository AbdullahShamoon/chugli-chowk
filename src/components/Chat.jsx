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
        <div>
            <h3>Room : {props.room}</h3>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <span>{message.user} : </span>
                        <span>{message.text}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} action="">
                <input type="text" placeholder='Enter your Message' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default Chat