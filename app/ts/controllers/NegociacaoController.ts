//Teste comentario
import { Negociacao, Negociacoes, NegociacaoParcial } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { NegociacaoService } from "../services/index";
import { domInject, throttle } from "../helpers/decorators/index";
import { imprime } from "../helpers/index";

export class NegociacaoController {
  @domInject("#data")
  private _inputData: JQuery;

  @domInject("#quantidade")
  private _inputQuantidade: JQuery;

  @domInject("#valor")
  private _inputValor: JQuery;

  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView("#negociacoesView");
  private _mensagemView = new MensagemView("#mensagemView");

  private _service = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle(500)
  adiciona() {
    const data = this._inputData.val()?.toString().replace(/-/g, ",");
    const quantidade = this._inputQuantidade.val()?.toString();
    const valor = this._inputValor.val()?.toString();

    if (data && quantidade && valor) {
      const negociacaoData = new Date(data.replace(/-/g, ","));
      if (!this._ehDiaUtil(negociacaoData)) {
        this._mensagemView.update(
          "Somente negociações em dias úteis, por favor!"
        );
        return;
      }

      const negociacaoQuantidade = parseInt(quantidade);
      const negociacaoValor = parseFloat(valor);

      const negociacao = new Negociacao(
        negociacaoData,
        negociacaoQuantidade,
        negociacaoValor
      );

      imprime(negociacao);
      this._negociacoes.adiciona(negociacao);
      this._negociacoesView.update(this._negociacoes);
      this._mensagemView.update("Negociação adicionada com sucesso!");

      imprime(this._negociacoes);
    }
  }

  private _ehDiaUtil(data: Date) {
    return (
      data.getDay() !== DiaDaSemana.Domingo &&
      data.getDay() !== DiaDaSemana.Sabado
    );
  }

  @throttle(500)
  async importaDados() {
    function isOk(res: Response) {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    }

    try {
      const negociacoesParaImportar = await this._service.obterNegociacoes(
        isOk
      );

      if (negociacoesParaImportar) {
        const negociacoesJaImportadas = this._negociacoes.paraArray();

        negociacoesParaImportar
          .filter((negociacao) => {
            return !negociacoesJaImportadas.some((jaImportada) => {
              console.log("COMP", negociacao.ehIgual(jaImportada));
              return negociacao.ehIgual(jaImportada);
            });
          })
          .forEach((negociacao) => {
            return this._negociacoes.adiciona(negociacao);
          });

        this._negociacoesView.update(this._negociacoes);
      }
    } catch (err) {
      this._mensagemView.update(err.message);
    }
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terça,
  Quarta,
  Quinta,
  Sexta,
  Sabado,
}
