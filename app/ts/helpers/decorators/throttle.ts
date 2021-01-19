export function throttle(miliSegundos = 500) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    //Salva o metodo original em uma variável
    const metodoOriginal = descriptor.value;

    let timer = 0;
    //Roda o método original e salva o retorno no descriptor
    descriptor.value = function (...args: any[]) {
      if (event) event.preventDefault();

      clearInterval(timer);

      timer = setTimeout(() => {
        metodoOriginal.apply(this, args);
      }, miliSegundos);
    };

    return descriptor;
  };
}
