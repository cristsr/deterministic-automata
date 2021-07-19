import { State } from './state';

const q0 = new State('q0', [
    {
        symbol: 'k',
        state: 'q1'
    }
]);


const q1 = new State('q1', [
    {
        symbol: 'k',
        state: 'q1'
    },
    {
        symbol: 'e',
        state: 'q5'
    },
]);


const q5 = new State('q5', [
    {
        symbol: 'e',
        state: 'q5'
    },
    {
        symbol: 'y',
        state: 'q9'
    },
    {
        symbol: 's',
        state: 'q11'
    },
]);

const q9 = new State('q9', [
    {
        symbol: 'y',
        state: 'q9'
    }
], true);

const q11 = new State('q11', [
    {
        symbol: 's',
        state: 'q11'
    },
], true);


console.log('hello')

const states: State[] = [q0, q1, q5, q9, q11];

export function execute(str: string): boolean {
    let result = false;
    console.log('Input: ', str);

    let state: State | undefined = states[0];

    // @ts-ignore
    for (const char of [...str]) {
        console.log('current char ', char)
        console.log('current state', state?.id)

        if (!state) {
            result = false
            break;
        }

        // @ts-ignore
        const nextState = state.values.find(v => v.symbol === char);

        if (!nextState) {
            console.log('nextState not found')
            result = false
            break
        }

        console.log('nextState ', nextState.state)


        //
        // @ts-ignore
        state = states.find(v => v.id === nextState.state)

        result = true
    }
    return result
}

const result =  execute('kkeeyy');

console.log(result);
