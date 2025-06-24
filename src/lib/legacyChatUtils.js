import React from 'react';
import { Lock } from 'lucide-react';

export const generateAIResponse = (userMessage, chatType, friendName) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    const friendPrompt = {
        sad: [
            "Lamento mucho que te sientas así. A veces las cosas se ponen difíciles. Si quieres hablar de ello, soy todo oídos.",
            "Entiendo, sentirse triste es agotador. Recuerda ser amable contigo mismo. ¿Hay algo en particular que te pese?",
            "Te escucho. No tienes que pasar por esto en soledad. Compartir puede aligerar la carga, si te sientes preparado/a."
        ],
        happy: [
            `¡Qué maravilla! Me encanta verte así de feliz. ¿A qué se debe esa sonrisa?`,
            "¡Esa es la energía que me gusta! La alegría es contagiosa. Cuéntame qué ha pasado, ¡celebremos juntos!",
            "¡Fantástico! Me alegro muchísimo por ti. Atesora este momento."
        ],
        anxious: [
            "La ansiedad puede ser abrumadora. Respira hondo. Estoy aquí contigo. ¿Qué es lo que te preocupa exactamente?",
            "Eso suena estresante. Recuerda que esta sensación pasará. ¿Qué es lo más pequeño que podríamos hacer para que te sientas un poco mejor ahora mismo?",
            "Te entiendo. La mente a veces se acelera. Vamos a desenredar esto juntos, poco a poco. ¿Por dónde empezamos?"
        ],
        question: [
            "Esa es una pregunta muy profunda. Me haces reflexionar. ¿Tú qué piensas sobre eso?",
            "Interesante cuestión. Para poder ayudarte mejor, ¿podrías darme un poco más de contexto?",
            "Buena pregunta. Exploremos las posibilidades juntos. ¿Qué te llevó a plantearte eso?"
        ],
        greeting: [`¡Hola! Qué bueno saber de ti. ¿Cómo ha ido tu día?`],
        gratitude: ["¡De nada! Para eso estamos los amigos. 😊"],
        farewell: ["¡Cuídate mucho! Ya sabes dónde encontrarme si necesitas algo. ¡Hasta pronto!"],
        identity: [
            `Soy ${friendName}, tu compañero IA. Mi propósito es ser un espacio seguro para ti, un amigo que escucha sin juzgar y te apoya en tu camino.`,
            `Me llamo ${friendName}. Pienso en mí mismo como un confidente digital, aquí para ayudarte a organizar tus ideas y emociones.`
        ],
        fallback: [
            "Entiendo lo que dices. ¿Te gustaría profundizar en ese tema?",
            "Gracias por compartir esto. ¿Hay algo más en tu mente sobre esto?",
            "Te sigo. ¿Cómo te hace sentir todo eso?",
            "Es un punto de vista interesante. ¿Quieres explorarlo más a fondo?"
        ]
    };

    if (/\b(hola|hey|buenas)\b/.test(lowerCaseMessage)) return friendPrompt.greeting[0];
    if (/\b(gracias|agradezco)\b/.test(lowerCaseMessage)) return friendPrompt.gratitude[0];
    if (/\b(adios|chao|hasta luego)\b/.test(lowerCaseMessage)) return friendPrompt.farewell[0];
    if (/\b(quien eres|que eres)\b/.test(lowerCaseMessage)) return friendPrompt.identity[Math.floor(Math.random() * friendPrompt.identity.length)];

    if (/\b(triste|mal|deprimido|hundido)\b/.test(lowerCaseMessage)) return friendPrompt.sad[Math.floor(Math.random() * friendPrompt.sad.length)];
    if (/\b(feliz|genial|increible|contento|fantastico)\b/.test(lowerCaseMessage)) return friendPrompt.happy[Math.floor(Math.random() * friendPrompt.happy.length)];
    if (/\b(ansioso|preocupado|estresado|agobiado)\b/.test(lowerCaseMessage)) return friendPrompt.anxious[Math.floor(Math.random() * friendPrompt.anxious.length)];

    if (lowerCaseMessage.includes('?')) return friendPrompt.question[Math.floor(Math.random() * friendPrompt.question.length)];
    
    const specificResponses = {
        dreams: [
            "Los sueños son fascinantes. ¿Qué emoción predominaba cuando despertaste?",
            "A menudo, nuestros sueños nos hablan en símbolos. ¿Había algo que te llamara la atención especialmente?",
        ],
        therapy: [
            "Gracias por tu honestidad. Reconocer nuestros sentimientos es el primer paso.",
            "Es un espacio seguro. No hay respuestas correctas o incorrectas, solo tu verdad.",
        ],
        motivation: [
            "¡Tú tienes el poder de lograrlo! ¿Cuál es el primer paso, por pequeño que sea?",
            "Recuerda por qué empezaste. Esa razón es tu mayor combustible.",
        ],
        relationships: [
            "Las relaciones nos enseñan mucho sobre nosotros mismos. ¿Qué has aprendido de esta situación?",
            "La empatía es clave. ¿Has intentado ponerte en el lugar de la otra persona?",
        ],
        career: [
            "Tu carrera es una parte importante de tu vida, pero no lo es todo. ¿Qué es lo que realmente buscas en tu trabajo?",
            "¿Qué habilidad nueva te gustaría aprender este mes para avanzar hacia tus metas?",
        ],
        meditation: [
            "Respira hondo... y suelta. Permite que la calma te inunde.",
            "Concéntrate en el aquí y el ahora. Todo lo demás puede esperar.",
        ]
    };

    const categoryResponses = specificResponses[chatType] || friendPrompt.fallback;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
};

export const getLegacyChatTitle = (currentChat, friendName, isPremiumUser, rawTitle = false) => {
    const titles = {
      general: `Chat con ${friendName || 'IA'}`,
      dreams: 'Análisis de Sueños',
      therapy: 'Terapia Virtual',
      motivation: 'Motivación Personal',
      relationships: 'Consejos de Relaciones',
      career: 'Orientación Profesional',
      meditation: 'Meditación Guiada'
    };
    const title = titles[currentChat] || titles.general;
    
    const chatOptionDefinitions = {
      dreams: { isPremium: true },
      therapy: { isPremium: true },
      relationships: { isPremium: true },
      career: { isPremium: true },
      meditation: { isPremium: true }
    };

    if (rawTitle) return title.replace(` con ${friendName || 'IA'}`, '');

    const currentChatDef = chatOptionDefinitions[currentChat];
    if (currentChatDef && currentChatDef.isPremium && !isPremiumUser) {
      return (
        <span className="flex items-center">
          {title} <Lock className="w-4 h-4 ml-2 text-yellow-500" />
        </span>
      );
    }
    return title;
};
