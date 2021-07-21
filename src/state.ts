export interface Edge {
  symbol: string;
  state: State;
}

export class State {
  public readonly edges: Edge[] = [];

  constructor(
    public readonly id: string,
    public readonly isInitial = false,
    public readonly isFinal = false,
  ) {}

  /**
   *
   * Given that "this" is the current state
   * then the transition function take as input the symbol and return the
   * next state.
   * if next state not found then throw an exception.
   * @param symbol
   */
  transition(symbol: string) {
    const edge: Edge | undefined = this.edges.find(
      (state: Edge) => state.symbol === symbol,
    );

    if (!edge) {
      throw new Error(`Next state not found for ${symbol} in state ${this.id}`);
    }

    return edge.state;
  }

  /**
   * After state instantiate, addEdge is called and populate
   * this.edges with states references
   * @param edge
   */
  addEdge(edge: Edge): State {
    this.edges.push(edge);
    return this;
  }
}
