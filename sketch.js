// Autor Timur Kim
// The final qualifying work 
// Code based on Daniel Shiffman`s "The Nature of Code" 
// Coding Challenge #16_ L - System Fractal Trees: https://youtu.be/E1B4UoSQMFw

const axiom = "F";
let sentence = axiom;
windowWidth = window.innerWidth;
windowHeight = window.innerHeight - 100;

/* 
Объявляем правила перемещения:
    F: шаг врперёд,
    +: поворот против чаовой стрелки,
    -: поворот по чаовой стрелке,
    [: запомнить положение,
    ]: вернуться в запоменное положение
*/
let rules = [];
rules[ 0 ] = {
    a: "F",
    b: "FF+[+F-F-F]-[-F+F+F]"
}

// Длина первой ветви
let len = 100;


// Генератор аксиомы. Строит предложение из команд правил rules
function generate ()
{
    // Уменьшаем длину ветвей для каждого нового уровня
    len *= 0.5;
    // Здесь мы будем накапливать команды
    let nextSentence = "";
    // Пробежимся по предложению
    for ( let i = 0; i < sentence.length; i++ )
    {
        // Берём текущую команду
        let current = sentence.charAt( i );
        let found = false;
        // И сравниваем её с нашими правилами rules
        for ( let j = 0; j < rules.length; j++ )
        {
            // Если команда вперёд, то добавляем правило для новых веток
            if ( current == rules[ j ].a )
            {
                found = true;
                nextSentence += rules[ j ].b;
                break;
            }
        }
        // Если нет, то повторяетя старая команда (поворот, запись в память или чтение)
        if ( !found )
        {
            nextSentence += current;
        }
    }
    // Записываем новые правила, выводим их на экран и запускаем черепаху для рисования
    sentence = nextSentence;
    createP( sentence );
    turtle();
}


// Функция черепаха. Рисует линии по пердложению sentence
function turtle ()
{
    // Ставим курсор в начало
    background( 51 );
    resetMatrix();
    translate( width / 2, height );
    stroke( 255, 100 );
    // И читаем пердложение sentence по буквам
    for ( let i = 0; i < sentence.length; i++ )
    {
        let current = sentence.charAt( i );
        let angle = Math.PI / 6;
        // Вперёд
        if ( current == "F" )
        {
            line( 0, 0, 0, -len );
            translate( 0, -len );
        }
        // Влево
        else if ( current == "+" )
        {
            rotate( angle );
        }
        // Вправо
        else if ( current == "-" )
        {
            rotate( -angle );
        }
        // Запомнить место
        else if ( current == "[" )
        {
            push();
        }
        // Вернуться
        else if ( current == "]" )
        {
            pop();
        }
    }
}

function setup ()
{
    // myCanvas = createCanvas( winWidth, winHeight );
    // myCanvas.parent( "canvas" );
    createCanvas( 400, 400 );//windowWidth, windowHeight );
    background( 51 );
    createP( axiom );
    turtle();
    let btn = createButton( "generate" );
    btn.mousePressed( generate );
}

