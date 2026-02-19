import { useAuth } from '../../../context/authContext';
import './rightPart.css';

export default function Message({ message, senderId }) {
    const { user } = useAuth();
    const isSender = senderId === user._id;
    const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Render content based on message type
    let content;
    if (message.type === 'image' && message.fileUrl) {
        content = <img src={message.fileUrl} alt="sent-img" className="message__media" />;
    } else if (message.type === 'video' && message.fileUrl) {
        content = <video src={message.fileUrl} controls className="message__media" />;
    } else if (message.type === 'audio' && message.fileUrl) {
        content = <audio src={message.fileUrl} controls className="message__media" />;
    } else if (message.type === 'link' && message.content) {
        content = <a href={message.content} target="_blank" rel="noopener noreferrer" className="message__link">{message.content}</a>;
    } else if (message.type === 'file' && message.fileUrl) {
        content = <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="message__file">Download file</a>;
    } else {
        content = <p className="message__text">{message.content}</p>;
    }

    return (
        <div className={`message ${isSender ? 'message--me' : 'message--other'}`}>
            <div className={`message__bubble ${isSender ? 'message__bubble--me' : 'message__bubble--other'}`}>
                {content}
                <span className="message__time">{messageTime}</span>
            </div>
        </div>
    );
}