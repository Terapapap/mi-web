import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, BookHeart, Lock } from 'lucide-react';
import { getChatTitle } from '@/lib/chatUtils';
import { DefinitiveLogo } from '@/components/Logo';

const ChatHeader = ({ friendName, currentChat, isPremiumUser, onMenuClick, onJournalClick, onLogoutClick }) => {
    const isCurrentChatPremiumLocked = getChatTitle(currentChat, friendName, isPremiumUser, true).isLocked;
    const title = getChatTitle(currentChat, friendName, isPremiumUser).title;

    const buttonVariants = {
        rest: { scale: 1, rotate: 0 },
        hover: { scale: 1.1, rotate: 5 },
        tap: { scale: 0.9, rotate: -5 }
    };

    return (
        <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-card/80 backdrop-blur-lg border-b border-border p-4 flex items-center justify-between shrink-0 z-10"
        >
            <div className="flex items-center gap-4">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="text-muted-foreground hover:bg-muted lg:hidden rounded-full"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </motion.div>
                <div className="flex items-center gap-3">
                    <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{delay: 0.2, type: 'spring'}}>
                       <DefinitiveLogo className="w-10 h-10 text-primary" />
                    </motion.div>
                    <div>
                        <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
                           {title} {isCurrentChatPremiumLocked && <Lock className="w-4 h-4 text-amber-500" />}
                        </h1>
                        {!isCurrentChatPremiumLocked && <p className="text-sm text-green-500 font-semibold">En línea</p>}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onJournalClick}
                        className="text-muted-foreground hover:bg-muted rounded-full"
                    >
                        <BookHeart className="w-5 h-5" />
                    </Button>
                </motion.div>
                 <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onLogoutClick}
                        className="text-muted-foreground hover:bg-muted rounded-full"
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </motion.div>
            </div>
        </motion.header>
    );
};

export default ChatHeader;