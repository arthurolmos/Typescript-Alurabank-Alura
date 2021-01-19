import { Negociacao, NegociacaoParcial } from "../models/index";

export class NegociacaoService {
  obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[] | void> {
    return fetch("http://localhost:8086/dados")
      .then((res) => handler(res))
      .then((res) => res.json())
      .then((dados: NegociacaoParcial[]) => {
        return dados.map(
          (dado) => new Negociacao(new Date(), dado.vezes, dado.montante)
        );
      })
      .catch((err) => {
        console.log(err.message);
        throw new Error("Não foi possível importar as negociações!");
      });
  }
}

export interface HandlerFunction {
  (res: Response): Response;
}
