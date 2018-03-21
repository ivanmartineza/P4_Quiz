/**
 * Created by ivan.martinez.ariza on 28/02/18.
 */
    //Ahora modificamos las sentencias para que en lugar de escribir por la consola escriba por el socket. Por tanto cambiamos todos los log. Se hace añadiendo un socket en las funciones, y en lugar de console.log(mete un retorno de regalo) hacemos socket.write, para igualar el socket,write al console metemos un retardo que simule el retorno que mete solo el console. log
const figlet = require('figlet');
const chalk =require('chalk');



/**
 * Dar color a un String
 *
 * @param msg Es string al que hay que dar color.
 * @param color EL color con el que pintar msg.
 * @returns {String} Devuelve el string msg con el color indicado.
 */
const colorize = (msg, color) => {
    if (typeof color !== "undefined"){
        msg = chalk[color].bold(msg);
    }
    return msg;
};

/**
 * Escribe un mensaje de log.
 *Me dan el mensaje y el color con el que quiero pintarlo, si no me dan el color pues paso solo el mensaje
 * @param msg EL string a escribir
 * @param color Color del texto
 */
const log = (socket, msg, color) => {
    socket.write(colorize(msg,color)+ "\n");
};

/**
 * Escribir un mensaje de log grande
 *
 * @param msg Texto a escribir
 * @param color Color de texto.
 */
const biglog = (socket, msg, color) => {
    log(socket, figlet.textSync(msg, { horizontalLayout: 'full'}), color);
};
/**
 * Escribe el mensaje de error emsg, pone la palabra error en rojo y luego pinta el mensaje de error en rojo después de dos puntos y como texto de fofo amarillo brillante
 * @param emsg Texto del mensaje de error
 */
//ponemos de fondo un amarillo brillante
const errorlog = (socket, emsg) => {
    socket.write( `${colorize("Error","red")}: ${colorize(colorize(emsg, "red"), "bgYellowBright")} \n`);
};

exports = module.exports = {
    colorize,
    log,
    biglog,
    errorlog

};
