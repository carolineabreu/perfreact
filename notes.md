# Fluxo de renderização do React

    1. Gerar uma nova versão do componente que precisa ser renderizado;
    2. Comparar essa nova versão com a versão anterior já salva na página;
    3. Se houver alterações, o React "renderiza" essa nova versão em tela;

# Memo

    - utilização:
        memo recebe dois parametros: o componente em si e quando temos objetos, arrays...elementos que não da pra comparar só usando ===, passamos uma função que vai retornar se o componente continua o mesmo ou não.
        a função sempre vai receber as propriedas anteriores e as próximas propriedades (que eu tenho agora)
        Object.is(prevProps, nextProps) ele faz uma comparação profunda
        só o primeiro parametro é obrigatório, se não passar o segundo, ele vai fazer uma comparação rasa (shallow), que é como se fosse com ===
    - quando usar o memo?
        1: para pure functional components => componentes apenas pra abstrair a parte visual/interface. funções puras são funções que dados os mesmos parâmetros sempre retornar os mesmos resultados.
        2: render too often: componentes que renderizam demais.
        quando o componente renderiza muitas vezes, mas com props diferentes o memo não vai ajudar
        3: Re-renders with the same props
        4: Medium to big size: o memo ganha mais performance quando o componente é de medio pra grande, em componentes muito pequenos (como o ProductItem) o custo do memo e o custo do react criar uma nova versão e comparar versão são praticamente os mesmos
