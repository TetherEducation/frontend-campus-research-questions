export const es = {
    "generic": {
        "continue": "Continuar",
        "skip": "Omitir"
    },
    "navbar": {
        "title": "Explora tu radio",
    },
    "enrollment_section": {
        "title": "Pregunta | Preguntas",
        "description": "Antes de comenzar, nos gustaría hacerte un par de preguntas para entender mejor tu situación y mejorar las recomendaciones que te ofreceremos, adaptadas a tus necesidades específicas.",
        "questions": "preguntas",
        "question_1": {
            "breadcrumb": "Pregunta 1",
            "title": "¿Estás pensando en matricular a su hijo/a en un nuevo centro educativo para el año académico 2023/2024 o el siguiente?",
            "options": "Sí, planeo matricular a mi hijo/a en un nuevo centro para el próximo año escolar %space% Sí, planeo matricular a mi hijo/a en un nuevo centro para el año escolar subsiguiente %space% No, no tengo planes de matricular a mi hijo/a en otro centro",
        },
        "question_2": {
            "breadcrumb": "Pregunta 2",
            "title": "¿Ya sabes a qué centro educativo vas a matricular a su hijo/a?",
            "options": "Sí, estoy seguro/a del centro al que asistirá %space% Sí, tengo una idea, pero no estoy completamente seguro/a del centro al que asistirá %space% No, aún no he decidido y no sé a qué centro asistirá",
        },
        "question_3": {
            "breadcrumb": "Pregunta 3",
            "title": "¿Cuál es el nombre del centro educativo al que asistirá?",
            "not_sure": "No estoy seguro del nombre del centro educativo.",
        },
    },
    "campus_around": {
        "title": "Explora tu radio",
        "question": {
            "title": "A 2 km de tu ubicación pueden haber muchos establecimientos educativos.",
            "description": "¿Cuantos crees que son?"
        },
        "result": {
            "bad": "Estuviste muy lejos",
            "regular": "Estuviste cerca",
            "good": "Respuesta correcta",
            "description_bad": "pero en realidad",
            "description_good": "y efectivamente",
            "description": ({ named, linked }: any) => {
                const value = named('isGoodAnswer') ? `${linked('campusAround.result.description_good')}` : `${linked('campusAround.result.description_bad')}`;
                let label = `Creiste que habían ${named('answer')} centros educativos a 2km de tu ubicación, typeDescription hay ${named('value')}`
                return label.replace("typeDescription", value);
                
            },
            "value": "Tu respuesta",
            "answer": "Respuesta Correcta"
        }
    }
}