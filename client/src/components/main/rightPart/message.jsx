import { useAuth } from '../../../context/authContext';
import './rightPart.css';

export default function Message({ message, senderId }) {
    const { user } = useAuth();
    const isSender = senderId === user._id;
    const messageTime = new Date(message.createdAt).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const text = message?.message || "";

    return (
        <div className={`message ${isSender ? 'message--me' : 'message--other'}`}>
            <div className={`message__bubble ${isSender ? 'message__bubble--me' : 'message__bubble--other'}`}>
                <p className="message__text">{text}</p>
                <span className="message__time">{messageTime}</span>
            </div>
        </div>
    );
}