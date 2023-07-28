export const es_DO = {
    "actions": {
        "next": "Continuar",
    },
    "welcome": {
        "description": 'Antes de comenzar, nos gustaría hacerte un par de <b>preguntas.</b>',
        "breadcrumb": "Preguntas"
    },
    "firstquestion": {
        "breadcrumb": "Pregunta 1",
        "question": "¿Estás pensando en matricular al estudiante en un nuevo centro educativo?",
        "results": [
            "<b>Sí,</b> planeo matricular al estudiante en un nuevo centro educativo para <b>septiembre del 2023</b>",
            "<b>Sí,</b> planeo matricular al estudiante en un nuevo centro educativo, pero para <b>septiembre del 2024</b>",
            "<b>No,</b> planeo <b>mantener al estudiante</b> en el mismo centro educativo.",
        ]
    },
    "secondquestion": {
        "breadcrumb": "Pregunta 2"
    },
    "thirdquestion": {
        "breadcrumb": "Pregunta 3"
    },



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
            "title": "¿Estás pensando en matricular al estudiante en un nuevo centro educativo?",
            "options": "<b>Sí,</b> planeo matricular al estudiante en un nuevo centro educativo para <b>septiembre del 2023</b> %space% <b>Sí,</b> planeo matricular al estudiante en un nuevo centro educativo, pero para <b>septiembre del 2024</b> %space% <b>No,</b> planeo <b>mantener al estudiante</b> en el mismo centro educativo.",
        },
        "question_2": {
            "breadcrumb": "Pregunta 2",
            "title": "¿Ya sabes a qué centro educativo vas a matricular al estudiante?",
            "options": "<b>Sí, estoy seguro/a</b> del centro al que asistirá %space% <b>Sí,</b> tengo una idea, pero <b>no estoy completamente seguro/a</b> del centro al que asistirá %space% <b>No, aún no he decidido</b> y no sé a qué centro asistirá",
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
            "title": "A 2 km de tu ubicación pueden haber muchos <b>establecimientos educativos de primaria.</b>",
            "description": "<b>¿Cuantos crees que son?</b>"
        },
        "result": {
            "bad": "Estuviste muy lejos",
            "regular": "Estuviste cerca",
            "good": "Respuesta correcta",
            "description_bad": "pero en realidad",
            "description_good": "y efectivamente",
            "description": ({ named, linked }: any) => {
                const value = named('isGoodAnswer') ? `${linked('campusAround.result.description_good')}` : `${linked('campusAround.result.description_bad')}`;
                let label = `Creíste que había ${named('answer')} centros educativos a 2km de tu ubicación, typeDescription hay ${named('value')}`
                return label.replace("typeDescription", value);
                
            },
            "value": "Tu respuesta",
            "answer": "Respuesta Correcta"
        }
    },
    "performance_and_payment": {
        "title": "Explora tu radio",
    },
    "go_to_explorer": {
        "title": "¡Comienza explorando!",
        "go": "Ir a Explorar"
    }
}