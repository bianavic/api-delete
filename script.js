let autores = document.querySelector('.authors');



fetch('https://reqres.in/api/users')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        data.data.forEach(element => {
            let card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('id', element.id);
            autores.appendChild(card);

            let foto = document.createElement('img');
            foto.src = element.avatar;
            card.appendChild(foto)

            let nome = document.createElement('h2');
            nome.innerHTML = element.first_name + ' ' + element.last_name;
            card.appendChild(nome);

            let email = document.createElement('p');
            email.innerHTML = element.email;
            card.appendChild(email);

            let botao = document.createElement('button');
            botao.setAttribute('data-id', element.id)
            botao.innerHTML = '✖'
            card.appendChild(botao)

            botao.addEventListener('click', () => {
                console.log('vou deletar')
                const thisCard = botao.parentElement;
                const cardPai = thisCard.parentElement;


                fetch('https://reqres.in/api/users', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        'id': botao.getAttribute('data-id')

                    })
                })
                    .then(() => {
                        cardPai.removeChild(thisCard)

                    })
                    .catch((erro) => {
                        console.log(erro)
                    })
            })
        })  
                .catch((erro) => {
                    console.log(erro)
                })

        });