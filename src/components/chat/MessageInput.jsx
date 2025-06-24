
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, CornerDownLeft } from 'lucide-react';
import { getChatTitle } from '@/lib/chatUtils';

const MessageInput = ({ message, setMessage, handleSendMessage, isTyping, isPremiumUser, currentChat, friendName, isMessageLimitReached, onUpgradeClick }) => {
    const isCurrentChatPremiumLocked = getChatTitle(currentChat, friendName, isPremiumUser, true).isLocked;
    
    const isDisabled = isTyping || isCurrentChatPremiumLocked || isMessageLimitReached;
    
    let placeholderText = `Escribe un mensaje a ${friendName}...`;
    if (isCurrentChatPremiumLocked) {
        placeholderText = 'Desbloquea Premium para chatear aquí';
    } else if (isMessageLimitReached) {
        placeholderText = 'Límite de mensajes alcanzado. ¡Actualiza!';
    }
    
    const onSend = () => {
        if(window.navigator.vibrate) window.navigator.vibrate(50);
        handleSendMessage();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isDisabled && message.trim()) {
                onSend();
            }
        }
    };

    return (
        <div className="space-y-2">
            {isMessageLimitReached && (
                <div className="text-center text-sm text-destructive p-2 bg-destructive/10 rounded-md">
                    Has alcanzado tu límite de 10 mensajes gratuitos. 
                    <Button variant="link" className="p-0 h-auto ml-1 text-destructive" onClick={onUpgradeClick}>
                        Actualiza a Premium
                    </Button> para continuar.
                </div>
            )}
            <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                    <Textarea
                        placeholder={placeholderText}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-lg py-3 px-4 pr-20 resize-none focus:ring-2 focus:ring-primary"
                        disabled={isDisabled}
                        rows={1}
                    />
                    <div className="absolute bottom-2 right-14 text-xs text-muted-foreground flex items-center gap-1">
                        Shift <CornerDownLeft className="w-3 h-3" /> para nueva línea
                    </div>
                </div>
                <Button
                    onClick={onSend}
                    disabled={!message.trim() || isDisabled}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 h-12 w-12 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 shrink-0"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default MessageInput;
