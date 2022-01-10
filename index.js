
//Importa dependencia do express
const express = require("express");
const res = require("express/lib/response");

//Inicializa o servico express
const server = express();

//Inicializa o Axios p/ consumir api
const api = require("./api");


server.use(express.json());
//Disponibiliza porta 8080
server.listen(8080);

//Define o root do servidor
 server.get('/', (req, response) => {

    return response.send("Servidor funcionando, bem-vind@!" );


});

//Aqui serão armazenados todos os valores numéricos vindos da API
var numeros = [];

//Define rota /total, esta que fornecerá o solicitado
server.get(`/total`, async (req, res) => {

    /* Foi verificado via while que a página final vai até o número 10.000 e aplicado a condição de ir até
    data.numbers.lenght()= 0 */

    //Esse algoritmo funciona de n até 10.000 até que o servidor retorne

    //Define o valor inicial da página inicial
    const vlrInicial = 1;
    let pagInicial = vlrInicial;
    let pagFinal = 60;
    //Aqui irá percorrer todas as páginas

    //Não foi utilizado While para evitar a sobrecarga de processos e resultar no erro 500

    for (pagInicial; pagInicial <= pagFinal; pagInicial++) {
        //Tenta consumir API do teste
        try {
            
            
            //data é o retorno de dados da api
            const { data } = await api.get("http://challenge.dienekes.com.br/api/numbers?page=" + pagInicial);
            
            //parametro do json
            numeros = numeros.concat(data.numbers);

            /*O Javascript não faz a ordenação dos números sozinho por função, logo
            dessa forma inseri uma função com parametros de numeros em uma função generica de ordenação de letras */
            
            numeros.sort((a, b) => a - b);
    
        }
        catch (error) {
            //consola o respectivo erro de retorno 
            return res.send({ error: error.message });

        }
        if (pagInicial === pagFinal) {
            //verifica via console a ordenação dos numeros
            console.log(numeros);
            //retorna em html o json da ordenacao
            return res.json(`Esses são os números ordenados da pagina:${vlrInicial} até a página:${pagFinal}         `+ numeros);



        }

    }


}
);

