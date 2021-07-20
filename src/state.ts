export interface Edge {
  symbol: string;
  state: State;
}

export class State {
  public readonly edges: Edge[] = [];

  constructor(
    public readonly id: string,
    public isInitial = false,
    public isFinal = false,
  ) {}

  /**
   * Teniendo en cuenta que "this" es es el estado actual
   * Entonces la funcion de transicion recibe como entrada el simbolo
   * y retorna el siguiente estado
   * @param symbol
   */
  transition(symbol: string) {
    const edge = this.edges.find((state) => state.symbol === symbol);

    if (!edge) {
      throw new Error(`Next state not found for ${symbol} in state ${this.id}`);
    }

    return edge.state;
  }

  addEdge(edge: Edge): State {
    this.edges.push(edge);
    return this;
  }
}
