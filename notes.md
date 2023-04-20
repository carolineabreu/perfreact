# Fluxo de renderização do React

    1. Gerar uma nova versão do componente que precisa ser renderizado;
    2. Comparar essa nova versão com a versão anterior já salva na página;
    3. Se houver alterações, o React "renderiza" essa nova versão em tela;

# Memo

    - utilização:
        const xxx = memo(componente, função de comparação de igualdade)
    - quando usar o memo?
        1: para pure functional components => componentes apenas pra abstrair a parte visual/interface. funções puras são funções que dados os mesmos parâmetros sempre retornar os mesmos resultados.
        2: render too often: componentes que renderizam demais.
        quando o componente renderiza muitas vezes, mas com props diferentes o memo não vai ajudar
        3: Re-renders with the same props
        4: Medium to big size: o memo ganha mais performance quando o componente é de médio pra grande, em componentes muito pequenos (como o ProductItem) o custo do memo e o custo do react criar uma nova versão e comparar versão são praticamente os mesmos

# useMemo

    - Funcionalidade:
        - tem uma única funcionalidade: evitar que alguma coisa que ocupe muito processamento(como um calculo) seja refeito toda vez que aquele componente renderizar. Podemos usar o useMemo para memorizar(memorization) entre as renderizações do componente o valor para que não seja recalculado toda vez do 0
    - Utilização:
        const xxx = useMemo(() => {função do cálculo}, [dependências])
    - quando usar o useMemo?
        1. Cálculos pesados - se o cálculo for muito simples e o usar o useMemo, pode ficar mais pesado com ele
        2. Igualdade referencial* (quando repassamos a informação a um componente filho) - se o cálculo não for pesado, mas a informação for repassada para os filhos, vale a pena utiliza-lo porque ele vai evitar que a informação seja criada do zero e o react no algoritmo de comparação dos dois valores faça uma comparação se um valor é igual ao outro e acabe não batendo porque eles ocupam um lugar diferente na memoria
    * igualdade referencial é uma forma de comparação duas variáveis dentro do javascript(é como o react faz), que é verificar se elas ocupam o mesmo espaço em memoria. Quando criamos uma nova informação no react (mesmo que ela já existia antes), estamos ocupando um novo espaço na memoria
