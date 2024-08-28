const frases = [
    { "frase": "Leitura antes de mais nada é estímulo é exemplo.", "autor": "Ruth Rocha" },
    { "frase": "Um livro é um sonho que você segura na mão.", "autor": "Neil Gaiman" },
    { "frase": "Não há problema que a leitura não possa solucionar.", "autor": "Charles Bukowski" },
    { "frase": "A leitura é provavelmente uma outra maneira de estar em um lugar.", "autor": "José Saramago" },
    { "frase": "A leitura engrandece a alma.", "autor": "Voltaire" },
    { "frase": "Sempre imaginei que o paraíso fosse uma espécie de biblioteca.", "autor": "Jorge Luis Borges" },
    { "frase": "A leitura é o caminho mais curto para o conhecimento.", "autor": "Aristóteles" },
    { "frase": "Uma vida sem leitura é uma vida sem esperança.", "autor": "George Orwell" },
    { "frase": "Ler mudou muda e continuará mudando o mundo.", "autor": "Virginia Woolf" },
    { "frase": "É preciso que a leitura seja um ato de amor.", "autor": "Paulo Freire" },
    { "frase": "Os livros têm grande importância em nossas vidas não só porque auxiliam na construção de nosso conhecimento mas também porque nos trazem palavras de encanto doçura e suavidade.", "autor": "Francis Bacon" },
    { "frase": "Ao lermos um bom livro destravamos as portas e janelas da alma deixamos as palavras nos levarem para mundos encantadores e fazemos descobertas sem fim.", "autor": "Scheila F. Scisloski" },
    { "frase": "A leitura é importante para aprimorar nossas próprias ideias.", "autor": "Iris Borges" },
    { "frase": "A leitura de um bom livro é um diálogo incessante: o livro fala e a alma responde.", "autor": "André Maurois" },
    { "frase": "A leitura abre as janelas do entendimento e desperta do sono a sabedoria.", "autor": "Rafael Mendes de Oliveira" },
    { "frase": "O incentivo à leitura além de ser uma importante ação cultural promove também a inclusão social e o desenvolvimento de novas ideias.", "autor": "Rozilda Euzebio Costa" },
    { "frase": "Leia livros! Ler um bom livro pode ajudar a eliminar pensamentos negativos e reduzir o cansaço mental.", "autor": "Maria Patriolino" },
    { "frase": "Ler um bom livro é como conversar com as melhores mentes do passado.", "autor": "René Descartes" },
    { "frase": "Reconhecemos a importância de um livro quando entramos nele por uma porta estreita e com o término da sua leitura saímos por uma porta espaçosa.", "autor": "Alison Aparecido Ferreira" },
    { "frase": "Leitura é a chave para se ter um universo de ideias e uma tempestade de palavras.", "autor": "Pedro Bom Jesus" },
    { "frase": "O processo de leitura possibilita essa operação maravilhosa que é o encontro do que está dentro do livro com o que está guardado na nossa cabeça.", "autor": "Ruth Rocha" },
    { "frase": "A leitura engrandece a alma.", "autor": "Voltaire" },
    { "frase": "A leitura traz ao homem plenitude; o discurso segurança; e a escrita precisão.", "autor": "Francis Bacon" },
    { "frase": "A leitura é para o intelecto o que o exercício é para o corpo.", "autor": "Joseph Addison" },
    { "frase": "Muitos homens iniciaram uma nova era na sua vida a partir da leitura de um livro.", "autor": "Henry David Thoreau" },
    { "frase": "O livro traz a vantagem de a gente poder estar só e ao mesmo tempo acompanhado.", "autor": "Mario Quintana" },
    { "frase": "Viver sem ler é muito perigoso. Você tem que acreditar naquilo que os outros te dizem.", "autor": "Mafalda" },
    { "frase": "Cuidado! O hábito da leitura pode iluminar o breu da sua ignorância.", "autor": "Gervasio Xavier Soares" },
    { "frase": "A leitura é uma viagem FANTÁSTICA ao mundo do CONHECIMENTO onde só você que ler tem a oportunidade de TRANSCENDER!", "autor": "Simone Drumond" },
    { "frase": "Ler é voar por caminhos infinitos!", "autor": "Simone Drumond" }
];

// Função para sortear uma frase aleatória
export default function sortearFrase() {
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    return frases[indiceAleatorio];
}