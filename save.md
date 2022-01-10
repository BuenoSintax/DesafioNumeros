for (let i = 1; i < 10000; i++) {



    server.get(`/${i}`, async (req, res) => {



        try {
            const { data } = await api.get("http://challenge.dienekes.com.br/api/numbers?page=" + i);
            numeros.push(data.numbers);
            console.log(numeros);
            
            return res.send(data.numbers);

        }           catch (error) {
                        return res.send({ error: error.message });

                  }

        }
    );

}

// return res.json(data.numbers[99]);


            /* numeros.push(data.numbers); */


            /* console.log(numeros);
            
            return res.send(data.numbers); */
