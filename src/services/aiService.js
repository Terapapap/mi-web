import * as chatUtils from '@/lib/chatUtils';
import { supabase } from '@/lib/supabaseClient';

export const generateRealAIResponse = async (userMessage, chatType, friendName, history) => {
    const systemPrompt = chatUtils.getSystemPrompt(chatType, friendName);
    
    const messagesForApi = history.map(msg => ({
        role: msg.role,
        content: msg.content
    }));
    messagesForApi.push({ role: 'user', content: userMessage });

    try {
        const { data, error } = await supabase.functions.invoke('openai-chat', {
            body: { messages: messagesForApi, systemPrompt },
        });

        if (error) {
            throw error;
        }

        if (data.error) {
            throw new Error(data.error);
        }

        return data.reply;
    } catch (error) {
        console.error('Error calling Supabase function:', error);
        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes('429') || errorMessage.includes('quota')) {
             return "¡Vaya! Parece que se ha excedido la cuota de OpenAI. Para continuar, es necesario revisar el plan y los datos de facturación en la web de OpenAI. Si obtienes una nueva clave de API, puedes proporcionármela para que la actualice.";
        }
        if (errorMessage.includes('missing openai api key')) {
             return "¡Casi listo! La IA necesita su llave para funcionar. Por favor, añade tu API Key de OpenAI en los 'Secrets' de tu proyecto de Supabase con el nombre OPENAI_API_KEY para despertar a tu asistente.";
        }
        return `Lo siento, he tenido un problema para conectar con mi cerebro. Por favor, inténtalo de nuevo más tarde.`;
    }
};