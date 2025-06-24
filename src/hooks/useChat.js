import { useState, useEffect, useCallback } from 'react';
import { generateRealAIResponse } from '@/services/aiService';
import * as chatUtils from '@/lib/chatUtils';
import { supabase } from '@/lib/supabaseClient';

const MESSAGE_LIMIT_FREE = 15;
const MOOD_SONG_LIMIT_FREE = 5;

export const useChat = (session, isPremiumUser, openPremiumModal, toast) => {
    const [currentChat, setCurrentChat] = useState('general');
    const [friendName, setFriendName] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [moodSongUsageCount, setMoodSongUsageCount] = useState(0);

    let isMessageLimitReached = false;
    if (!isPremiumUser) {
        if (currentChat === 'mood-song') {
            isMessageLimitReached = moodSongUsageCount >= MOOD_SONG_LIMIT_FREE;
        } else {
            isMessageLimitReached = messageCount >= MESSAGE_LIMIT_FREE;
        }
    }

    useEffect(() => {
        const nameFromMeta = session?.user?.user_metadata?.full_name;
        const nameFromStorage = localStorage.getItem('aiFriendName');
        setFriendName(nameFromMeta || nameFromStorage || 'Amigo IA');
    }, [session]);

    const loadGuestMessages = useCallback((chatType) => {
        try {
            const storedMessages = JSON.parse(localStorage.getItem(`guest-chat-${chatType}`)) || [];
            const storedCount = parseInt(localStorage.getItem('guest-message-count') || '0', 10);
            const storedMoodSongCount = parseInt(localStorage.getItem('guest-mood-song-count') || '0', 10);
            
            if (storedMessages.length === 0) {
                const initialMessageContent = chatUtils.getInitialMessage(chatType, friendName, isPremiumUser);
                const initialMessage = {
                    id: `guest-${Date.now()}`,
                    role: 'assistant',
                    content: initialMessageContent,
                    created_at: new Date().toISOString(),
                    chat_type: chatType,
                };
                setMessages([initialMessage]);
                localStorage.setItem(`guest-chat-${chatType}`, JSON.stringify([initialMessage]));
            } else {
                setMessages(storedMessages);
            }
            setMessageCount(storedCount);
            setMoodSongUsageCount(storedMoodSongCount);
        } catch (error) {
            toast({ title: "Error al cargar el chat de invitado", description: "Puede que el chat local esté corrupto.", variant: "destructive" });
            setMessages([]);
        }
    }, [friendName, isPremiumUser, toast]);

    const fetchMessagesFromSupabase = useCallback(async () => {
        if (!session?.user) return;

        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('chat_type', currentChat)
            .order('created_at', { ascending: true });

        if (error) {
            toast({ title: "Error al cargar mensajes", description: error.message, variant: "destructive" });
            setMessages([]);
        } else if (data.length === 0) {
            const initialMessageContent = chatUtils.getInitialMessage(currentChat, friendName, isPremiumUser);
            const initialMessage = {
                id: `db-${Date.now()}`,
                role: 'assistant',
                content: initialMessageContent,
                created_at: new Date().toISOString(),
                chat_type: currentChat,
                user_id: session.user.id,
            };
            setMessages([initialMessage]);
        } else {
            setMessages(data);
        }
        
        const { count: totalUserMsgs } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('user_id', session.user.id).eq('role', 'user');
        const { count: moodSongMsgs } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('user_id', session.user.id).eq('role', 'user').eq('chat_type', 'mood-song');
        
        setMoodSongUsageCount(moodSongMsgs || 0);
        setMessageCount((totalUserMsgs || 0) - (moodSongMsgs || 0));

    }, [session, currentChat, friendName, isPremiumUser, toast]);

    useEffect(() => {
        if (session) {
            fetchMessagesFromSupabase();
        } else {
            loadGuestMessages(currentChat);
        }
    }, [session, currentChat, fetchMessagesFromSupabase, loadGuestMessages]);

    const handleSendMessage = useCallback(async () => {
        if (!message.trim() || isTyping) return;

        if (isMessageLimitReached) {
            let toastDescription = '¡Actualiza a Premium para enviar mensajes ilimitados!';
            if (currentChat === 'mood-song') {
                toastDescription = 'Has alcanzado el límite de 5 canciones. ¡Actualiza a Premium para más!';
            }
            toast({
                title: 'Límite de mensajes alcanzado',
                description: toastDescription,
                variant: 'destructive',
            });
            openPremiumModal();
            return;
        }

        const tempMessageContent = message;
        setMessage('');
        setIsTyping(true);

        const userMessage = {
            id: `temp-${Date.now()}`,
            role: 'user',
            content: tempMessageContent,
            created_at: new Date().toISOString(),
            chat_type: currentChat,
            user_id: session?.user?.id || null,
        };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);

        try {
            const history = newMessages.map(m => ({ role: m.role, content: m.content }));
            const aiResponseContent = await generateRealAIResponse(tempMessageContent, currentChat, friendName, history);
            
            const aiResponseMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: aiResponseContent,
                created_at: new Date().toISOString(),
                chat_type: currentChat,
                user_id: session?.user?.id || null,
            };

            const finalMessages = [...newMessages, aiResponseMessage];
            setMessages(finalMessages);

            if (session) {
                const { error: userInsertError } = await supabase.from('messages').insert({ ...userMessage, id: undefined, created_at: undefined });
                const { error: aiInsertError } = await supabase.from('messages').insert({ ...aiResponseMessage, id: undefined, created_at: undefined });
                
                if (userInsertError || aiInsertError) {
                    toast({ title: "Error al guardar mensaje", description: userInsertError?.message || aiInsertError?.message, variant: "destructive" });
                    fetchMessagesFromSupabase();
                } else {
                     if (!isPremiumUser) {
                        if (currentChat === 'mood-song') {
                            setMoodSongUsageCount(prev => prev + 1);
                        } else {
                            setMessageCount(prev => prev + 1);
                        }
                    }
                }
            } else {
                 if (!isPremiumUser) {
                    if (currentChat === 'mood-song') {
                        const newCount = moodSongUsageCount + 1;
                        setMoodSongUsageCount(newCount);
                        localStorage.setItem('guest-mood-song-count', newCount.toString());
                    } else {
                        const newCount = messageCount + 1;
                        setMessageCount(newCount);
                        localStorage.setItem('guest-message-count', newCount.toString());
                    }
                }
                localStorage.setItem(`guest-chat-${currentChat}`, JSON.stringify(finalMessages));
            }
        } catch (error) {
            toast({ title: "Error de la IA", description: error.message, variant: "destructive" });
            const errorResponse = {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: `Lo siento, he tenido un problema para conectar con mi cerebro. ${error.message}`,
                created_at: new Date().toISOString(),
                chat_type: currentChat,
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
            if (session) {
                fetchMessagesFromSupabase();
            }
        }

    }, [message, isTyping, isMessageLimitReached, isPremiumUser, session, currentChat, friendName, messages, toast, openPremiumModal, fetchMessagesFromSupabase, messageCount, moodSongUsageCount]);

    return {
        currentChat,
        setCurrentChat,
        friendName,
        messages,
        isTyping,
        message,
        setMessage,
        handleSendMessage,
        isMessageLimitReached
    };
};