import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllUsers, getMessages, sendMessage as sendMessageApi } from "../api/chatApi";


// Zustand store for managing all app state (except auth & socket)
const useConversation = create(
    persist(
        (set, get) => ({
            // ----─── Conversation State ───-----
            selectedConversation: null,
            setSelectedConversation: (selectedConversation) => {
                set({ selectedConversation });
                // Auto-clear unread count when selecting a conversation
                if (selectedConversation?._id) {
                    set((state) => ({
                        allUnReadMessages: {
                            ...state.allUnReadMessages,
                            [selectedConversation._id]: 0,
                        },
                    }));
                }
            },

            // ----─── Messages State ───-----
            // Global message store: { [userId_1]: [msg1, msg2, ...], [userId_2]: [msg1, msg2, ...], ... }
            allMessages: {},
            loadingMessages: false,
            allUnReadMessages: {}, // { [userId]: count }

            // Increment unread count for a specific user
            incrementUnreadCount: (userId) =>
                set((state) => ({
                    allUnReadMessages: {
                        ...state.allUnReadMessages,
                        [userId]: (state.allUnReadMessages[userId] || 0) + 1,
                    },
                })),

            // Get messages for the currently selected conversation
            getMessages: () => {
                const { allMessages, selectedConversation } = get();
                if (!selectedConversation?._id) return [];
                return allMessages[selectedConversation._id] || [];
            },

            // Add a message to a specific user's conversation
            addMessageToUser: (userId, newMessage) =>
                set((state) => ({
                    allMessages: {
                        ...state.allMessages,
                        [userId]: [...(state.allMessages[userId] || []), newMessage],
                    },
                })),

            // Add a message to the currently selected conversation
            addMessage: (newMessage) => {
                const { selectedConversation } = get();
                if (!selectedConversation?._id) return;
                get().addMessageToUser(selectedConversation._id, newMessage);
            },
            // Fetch messages for the selected conversation (with caching)
            fetchMessages: async () => {
                const { selectedConversation, allMessages } = get();
                if (!selectedConversation?._id) return;
                // Skip fetch if already cached
                if (allMessages[selectedConversation._id]) return;
                set({ loadingMessages: true });
                try {
                    const res = await getMessages(selectedConversation._id);
                    set((state) => ({
                        allMessages: {
                            ...state.allMessages,
                            [selectedConversation._id]: res.data,
                        },
                        loadingMessages: false,
                    }));
                } catch (error) {
                    console.log("Error in getting messages", error);
                    set({ loadingMessages: false });
                }
            },
            // Mark messages as read for the selected conversation
            markMessagesAsRead: (userId) => {
                set((state) => ({
                    allUnReadMessages: {
                        ...state.allUnReadMessages,
                        [userId]: 0,
                    },
                }));
            },

            // ----─── Send Message ───-----
            sendingMessage: false,
            // message: { content, file }
            sendMessage: async (message) => {
                const { selectedConversation, addMessageToUser } = get();
                if (!selectedConversation?._id) return;
                set({ sendingMessage: true });
                try {
                    const res = await sendMessageApi(selectedConversation._id, message);
                    addMessageToUser(selectedConversation._id, res.data);
                    set({ sendingMessage: false });
                } catch (error) {
                    console.log("Error in send messages", error);
                    set({ sendingMessage: false });
                }
            },

            // ----─── All Users State ───-----
            allUsers: [],    // List of all users for starting new conversations
            loadingUsers: false,
            fetchAllUsers: async () => {
                set({ loadingUsers: true });
                try {
                    const response = await getAllUsers();
                    set({ allUsers: response.data, loadingUsers: false });
                } catch (error) {
                    console.log("Error in fetchAllUsers: " + error);
                    set({ loadingUsers: false });
                }
            },

        }),
        // Persist only the unread messages count in localStorage to survive page refreshes
        {
            name: "chat-unread-storage", // localStorage key
            partialize: (state) => ({
                allUnReadMessages: state.allUnReadMessages,
            }),
        }
    )
);

export default useConversation;