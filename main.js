/**
 * Created by ivan.martinez.ariza on 27/02/18.
 */

const readline = require('readline');
const { log, biglog, errorlog, colorize} =require("./out");
const cmds =require("./cmds");
// creamos la variable net para refereir el moculo
const net = require("net");
net.createServer(socket => {
    console.log("Se ha conectado un cliente desde " + socket.remoteAddress);

    //sale el mensaje de bienvenida
    biglog('CORE Quiz', 'green');
    const rl = readline.createInterface({
        input: socket,
        output: socket,//nos pinta de color azul el prompt
        prompt: colorize("quiz > ", 'blue'),
        completer: (line) => {
        const completions = 'h help quit q add list show test play p'.split(' ');
const hits = completions.filter((c) => c.startsWith(line));
// show all completions if none found
return [hits.length ? hits : completions, line];
}
});

    //vamos a atender los eventos de los sockets
socket
    .on("end", () => { rl.close();}) //Para que cuando el cliente cierre la conexión cerrad el readline y no seguir leyendo
    .on("error", () => { rl.close();}); // en caso de que hay aalgún error tampoco queremos que siga hayendo tráfico entre el cliente y el servidor
//sale el prompt
rl.prompt();

rl
    .on('line', (line) => {

    let args = line.split(" ");
let cmd = args[0].toLowerCase().trim();

switch (cmd){
    //caso de vacío no me retorna nada
    case '':
        //como esta función no la tenemos definida ponemos el prompt
        rl.prompt();
        break;
    //mensajes de erro
        //Necesitamos que todos los comandos escriban también por el socket por tanto tenemos que volver a cambiar las sentencias del log
    case   'h':
    case 'help':
        cmds.helpCmd(socket, rl);
        break;
    case 'quit':
    case 'q':
        cmds.quitCmd(socket, rl);
        break;
    case 'add':
        cmds.addCmd(socket, rl);
        break;
    case 'list':
        cmds.listCmd(socket, rl);
        break;
    case 'show':
        cmds.showCmd(socket,rl,args[1]);
        break;
    case 'test':
        cmds.testCmd(socket,rl,args[1]);
        break;
    case 'play':
    case  'p':
        cmds.playCmd(socket, rl);
        break;
    case 'delete':
        cmds.deleteCmd(socket, rl,args[1]);
        break;
    case 'edit':
        cmds.editCmd(socket, rl,args[1]);
        break;
    case 'credits':
        cmds.creditsCmd(socket, rl);
        break;

    default:
        log(socket, `Comando desconocido: '${colorize(cmd,'red')}'`);
        //cuando el comando es desconocido además meto color y una llamada para ello al método colorize
        log(socket, `Use ${colorize('help','green')} para ver todos los comandos disponibles.`);
        rl.prompt();
        break;
}
//movemos el prompt porque son procesos asíncornos en los que el programa sigue trabajando aunque haya
//impreso ya información. Lo vamos a poner dentro de cada método
rl.prompt();
})
.on('close',() => {
    log(socket, 'Adios');
process.exit(0);
});




})
.listen(3030); // creamos el socket servidor , y ponemos como parametro la función  que queremos ejecutar cada vez que se conecta el servidor. Tenemso que decir que escuche en el puerto 3030. Cada vez que se conecte un cliente el socket que se va a ejecutar estará ahí y tiene que hacer todo lo que antes haciamos fuera, es decir, el const rl en adelante.

//para importar todas las sentencias de model que nos hemos llevado a otra clase para que el Main no sea tan sumamente grande. Se pone asi porque es un fichero local



//figuro el readline, lee del teclado y saca de la pantalla
