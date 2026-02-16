// import {Dp} from '../../../assets/defaultDP.jpg';
import useConversation from '../../../store/zustand';
import './leftPart.css';

export default function User({ user, isOnline }) {
    const { setSelectedConversation, selectedConversation, allUnReadMessages } = useConversation();

    function handleUserClick() {
        setSelectedConversation(user);
    }

    const isSelected = selectedConversation?._id === user._id;
    const unreadCount = allUnReadMessages[user._id] || 0;
    
    return (

        <div
            onClick={handleUserClick}
            className={`left__user ${isSelected ? 'left__user--selected' : ''}`}
        >
            {/* Icon */}
            <div className="left__avatar">
                <img src={user.profileImage.url || "dp"} alt="User Avatar" />
                {isOnline && <span className="online-indicator"></span>}
            </div>

            {/* User info */}
            <div className="left__userinfo">
                <p className="left__username">{user.username}</p>
                <p className="left__usermeta">{user.email}</p>
            </div>

            {/* Unread badge */}
            {unreadCount > 0 && (
                <span className="left__unread-badge">
                    {unreadCount > 99 ? '99+' : unreadCount}
                </span>
            )}
        </div>
    );
}
