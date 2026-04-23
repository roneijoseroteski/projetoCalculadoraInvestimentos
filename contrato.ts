// Contrato para o objeto de configuração das colunas da tabela
// 1-  Sistema deve usar o tailwind para estilizar a tabela, então o contrato deve ser compatível com as classes do tailwind
//2- Sistema deve ter um elemento html do tipo table (com id definido) preparado e sem informações dentro
//3- São nescessários dois arrays para a geração da tabela, um para as colunas e outro para os dados, ambos devem ser compatíveis com o contrato definido
//3.1 -Um array de dados, onde cada objeto representa uma linha da tabela, e as chaves de cada objeto devem corresponder aos acessores definidos no array de colunas
//3.2-Um array com objetos que caracterizam as colunas da tabela, onde cada objeto deve conter um rótulo para a coluna e um acessor que corresponde à chave dos objetos do array de dados
//3.3-Não é necessário, mas pode-se passar uma função de formatação dos dados daquela coluna, para formatar os dados de acordo com a necessidade (ex: formatação de moeda, porcentagem, etc)
type columnObject = {
  columnLabel: string;
  accessor: string;
  formatFN?: (info: number | string) => string;
};

type columnArray = columnObject[];

// [
// 	{
// 		columnLabel: "Total Investido",
// 		accessor: "investedAmount"
// 	},
// 	{
// 		columnLabel: "Rendimento Mensal",
// 		accessor: "interestReturns"
// 	},
// 	{
// 		columnLabel: "Rendimento Total",
// 		accessor: "totalInterestReturns"
// 	},
// 		{
// 		columnLabel: "Mês",
// 		accessor: "month"
// 	},
// 		{
// 		columnLabel: "Quantia Total",
// 		accessor: "totalAmount"
// 	},

// ]
