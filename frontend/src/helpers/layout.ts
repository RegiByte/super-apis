/** essa função recebe uma lista de parametros string ou null, e filtra fora os falsy values
 * retornando uma string com a junção das classes validas. */
export function classNames(...classes: (string | null)[]) {
  return classes.filter(Boolean).join(" ");
}