export const en = {
    "generic": {
        "continue": "Continue",
        "skip": "Skip"
    },
    "navbar": {
        "title": "Explore your radius",
    },
    "enrollment_section": {
        "title": "Preguntas",
        "description": "Antes de comenzar, nos gustaría hacerte un par de {questions} para entender mejor tu situación y mejorar las recomendaciones que te ofreceremos, adaptadas a tus necesidades específicas.",
        "questions": "preguntas",
    },
    "campus_around": {
        "question": {
            "title": "There may be many educational institutions within a 2 km radius of your location.",
            "description": "How many do you think there are?"
        },
        "result": {
            "bad": "You were far off",
            "regular": "You were very close",
            "good": "Correct answer",
            "description_bad": "there are",
            "description_good": "there are",
            "description": ({ named, linked }: any) => {
                const value = named('isGoodAnswer') ? `${linked('campusAround.result.description_good')}` : `${linked('campusAround.result.description_bad')}`;
                let label = `You thought there were ${named('answer')} schools in your neighborhood, but in reality, there are, ${named('value')}`
                return label.replace("typeDescription", value);
                
            },
            "value": "Tu respuesta",
            "answer": "Respuesta Correcta"
        }
    }
}