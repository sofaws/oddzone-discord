
export const COMMONS = {
    A_NUMBER: [
        'Un nombre petit con!'
    ],
    CHEAT: [
        '<@{author}> essaie de tricher et donne un chiffre hors limite :O, on attends tous qu\'il recommence...!'
    ]
}

export const BEGIN_PARTY = {
    ALREADY_IN_GAME: [
        'Toi ou/et ton adversaire avez déja une partie en cours ! <@{adversary}>',
    ],
    WITHOUT_DEFI: [
        'C\'est bien de jouer, avec un défi c\'est mieux !',
    ],
    GIVE_NUMBER: [
        'La partie commence ! Donne un chiffre <@{adversary}>',
    ],
    IMPOSSIBLE: [
        'Impossible de jouer avec ce joueur',
    ]
}

export const WAIT_FIRST_NUMBER = {
    ENJEU: [
        'On rappelle l\'enjeu en cas de défaite: {defi} :O'
    ],
    NOT_LITTLE_NUMBER: [
        'Pas de grosse ball mais ça se joue! Envoyez moi votre chiffre par mp ;) '
    ],
    LITTLE_NUMBER: [
        'Le courage à l\'état pur ! Envoyez moi votre chiffre par mp ;)'
    ]
}


export const WAIT_NUMBERS = {
    ONE_NUMBER_GIVE: [
        'Et de un !'
    ],
    WIN: [
        '<@{adversary}> est dans le mal, les deux ont donné un {content}. Il doit respecter le défi : {defi} '
    ],
    LOSE_BUT_COUNTER: [
        'un {content} et un {response} ça ne colle pas ! Mais <@{adversary}> a le droit à un contre car il a porté ses couilles !! J\'attends vos nouveaux nombres en MP!`'
    ],
    LOSE: [
        '<@{adversary}> s\'en sort bien ! un {content} et un {response} ça ne colle pas !'
    ]
}


export const WAIT_NUMBERS_COUNTER = {
    ONE_NUMBER_GIVE: [
        'Et de un pour le contre!'
    ],
    WIN: [
        '<@{owner}> est dans le mal, les deux ont donné un {content} lors du contre. Il doit respecter le défi : {defi} '
    ],
    LOSE: [
      '<@{owner}> s\'en sort bien, le contre aurait pu faire mal ! un {content} et un {response} ça ne colle pas ! '
    ]
}