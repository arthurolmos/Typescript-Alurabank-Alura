System.register(["../models/index", "../views/index", "../services/index", "../helpers/decorators/index", "../helpers/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var index_1, index_2, index_3, index_4, index_5, NegociacaoController, DiaDaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.Negociacoes();
                    this._negociacoesView = new index_2.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_2.MensagemView("#mensagemView");
                    this._service = new index_3.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona() {
                    var _a, _b, _c;
                    const data = (_a = this._inputData.val()) === null || _a === void 0 ? void 0 : _a.toString().replace(/-/g, ",");
                    const quantidade = (_b = this._inputQuantidade.val()) === null || _b === void 0 ? void 0 : _b.toString();
                    const valor = (_c = this._inputValor.val()) === null || _c === void 0 ? void 0 : _c.toString();
                    if (data && quantidade && valor) {
                        const negociacaoData = new Date(data.replace(/-/g, ","));
                        if (!this._ehDiaUtil(negociacaoData)) {
                            this._mensagemView.update("Somente negociações em dias úteis, por favor!");
                            return;
                        }
                        const negociacaoQuantidade = parseInt(quantidade);
                        const negociacaoValor = parseFloat(valor);
                        const negociacao = new index_1.Negociacao(negociacaoData, negociacaoQuantidade, negociacaoValor);
                        index_5.imprime(negociacao);
                        this._negociacoes.adiciona(negociacao);
                        this._negociacoesView.update(this._negociacoes);
                        this._mensagemView.update("Negociação adicionada com sucesso!");
                        index_5.imprime(this._negociacoes);
                    }
                }
                _ehDiaUtil(data) {
                    return (data.getDay() !== DiaDaSemana.Domingo &&
                        data.getDay() !== DiaDaSemana.Sabado);
                }
                importaDados() {
                    return __awaiter(this, void 0, void 0, function* () {
                        function isOk(res) {
                            if (res.ok) {
                                return res;
                            }
                            else {
                                throw new Error(res.statusText);
                            }
                        }
                        try {
                            const negociacoesParaImportar = yield this._service.obterNegociacoes(isOk);
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
                        }
                        catch (err) {
                            this._mensagemView.update(err.message);
                        }
                    });
                }
            };
            __decorate([
                index_4.domInject("#data")
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_4.domInject("#quantidade")
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_4.domInject("#valor")
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_4.throttle(500)
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_4.throttle(500)
            ], NegociacaoController.prototype, "importaDados", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
                DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
                DiaDaSemana[DiaDaSemana["Ter\u00E7a"] = 2] = "Ter\u00E7a";
                DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
                DiaDaSemana[DiaDaSemana["Sabado"] = 6] = "Sabado";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
